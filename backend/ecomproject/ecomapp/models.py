from django.db import models
from django.contrib.auth.models import User

class Products(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    productname = models.CharField(max_length=100)
    image = models.ImageField(null=True, blank=True)
    productbrand = models.CharField(max_length=100, null=True, blank=True)
    productcategory = models.CharField(max_length=100, null=True, blank=True)
    productinfo = models.TextField()
    rating = models.DecimalField(max_digits=5,decimal_places=2, null=True, blank=True)
    numReviews=models.IntegerField(null=True,blank=True,default=0)
    price = models.DecimalField(max_digits=7,decimal_places=2, null=True, blank=True)
    stockcount = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add =True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.productname

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    orderItems = models.JSONField()
    shippingAddress = models.JSONField()
    paymentMethod = models.CharField(max_length=200)
    itemsPrice = models.DecimalField(max_digits=10, decimal_places=2)
    shippingPrice = models.DecimalField(max_digits=10, decimal_places=2)
    taxPrice = models.DecimalField(max_digits=10, decimal_places=2)
    totalPrice = models.DecimalField(max_digits=10, decimal_places=2)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"