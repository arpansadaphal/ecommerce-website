from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view,permission_classes
from .models import Products, Order
from .serializer import ProductsSerializer,UserSerializer,UserSerializerWithToken, OrderSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from django.db.models import Q
from django.contrib.auth.decorators import login_required
from django.utils import timezone
# for sending mails and generate token
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from .utils import TokenGenerator,generate_token
from django.utils.encoding import force_bytes,force_text,DjangoUnicodeDecodeError
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View

@api_view(['GET'])
def getRoutes(request):
    return JsonResponse('hello', safe=False)


@api_view(['GET'])
def getProducts(request):
    products = Products.objects.all()
    serializer = ProductsSerializer(products, many=True) 
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Products.objects.get(_id=pk)
    serializer = ProductsSerializer(product, many=False)
    return Response(serializer.data)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer=UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v       
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user=request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    user=User.objects.all()
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data= request.data
    try:
        user=User.objects.create(first_name=data['fname'],last_name=data['lname'],username=data['email'],email=data['email'],password=make_password(data['password']))

        # generate token for sending mail

       
        # email_subject="Activate Your Account"
        # message=render_to_string(
        #     "activate.html",
        #    {
        #     'user':user,
        #     'domain':'127.0.0.1:8000/',
        #     'uid':urlsafe_base64_encode(force_bytes(user.pk)),
        #     'token':generate_token.make_token(user)
        #    }

        # )

        # print(message)


        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except Exception as e:
        message ={e}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
# class ActivateAccountView(View):
#     def get(self,request,uidb64,token):
#         try:
#             uid=force_text(urlsafe_base64_decode(uidb64))
#             user=User.objects.get(pk=uid)
#         except Exception as identifier:
#             user=None
#         if user is not None and generate_token.check_token(user,token):
#             user.is_active=True
#             user.save()
#             return render(request,"activatesuccess.html")
#         else:
#             return render(request,"activatefail.html")   

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):
    data = request.data
    user = request.user

    # Validate that orderItems exists
    if not data.get("orderItems") or len(data["orderItems"]) == 0:
        return Response(
            {"detail": "No order items provided"}, status=status.HTTP_400_BAD_REQUEST
        )

    # Create the order with isPaid set to False initially
    order = Order.objects.create(
        user=user,
        orderItems=data["orderItems"],
        shippingAddress=data["shippingAddress"],
        paymentMethod=data["paymentMethod"],
        itemsPrice=data["itemsPrice"],
        shippingPrice=data["shippingPrice"],
        taxPrice=data["taxPrice"],
        totalPrice=data["totalPrice"],
        isPaid=True,
        paidAt=timezone.now(),
    )

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)




def search_products(request):
    query = request.GET.get('query', '')
    if query:
      
        products = Products.objects.filter(
            Q(productname__icontains=query) | Q(productinfo__icontains=query) | Q(price__icontains=query) | Q(productbrand__icontains=query) | Q(productcategory__icontains=query)
         
        )
    else:
        products = Products.objects.all()

    # Prepare response data
    product_data = [
        {
            "productname": product.productname,
            "image": product.image.url if product.image else None, 
            "price": product.price,
            "productinfo": product.productinfo,
            "productbrand": product.productbrand,
            "productcategory": product.productcategory,
            "rating": product.rating,
            "numReviews": product.numReviews,
            "stockcount": product.stockcount,
            "_id": product._id
        }
        for product in products
    ]

    return JsonResponse(product_data, safe=False)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def order_history(request):
    try:
        # Ensure the user is authenticated
        if not request.user.is_authenticated:
            return JsonResponse({"error": "User is not authenticated"}, status=401)
        
        # Fetch orders for the authenticated user
        orders = Order.objects.filter(user=request.user).order_by("-createdAt")
        data = [
            {
                "id": order.id,
                "createdAt": order.createdAt,
                "totalPrice": order.totalPrice,
                "isPaid": order.isPaid,
                "paidAt": order.paidAt,
                "shippingAddress": order.shippingAddress,
                "paymentMethod": order.paymentMethod,
                "itemsPrice": order.itemsPrice,
                "shippingPrice": order.shippingPrice,
                "taxPrice": order.taxPrice,
                "orderItems": order.orderItems,
            }
            for order in orders
        ]
        return JsonResponse(data, safe=False)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)