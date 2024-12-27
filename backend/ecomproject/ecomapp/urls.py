from ecomapp import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
urlpatterns = [
    path("", views.getRoutes, name="Routes"),
    path("products/", views.getProducts, name="getProducts"),
    path("product/<str:pk>", views.getProduct, name="getProduct"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path("users/profile/",views.getUserProfile,name='getUserProfile'),
    path("users/",views.getUsers,name='getUsers'),
    path('users/register/',views.registerUser,name="register"),
    path("orders/", views.create_order, name="create_order"),
    path('products/search/', views.search_products, name='search_products'),
    path('orders/history/', views.order_history, name='order_history'),
]   
