from django.contrib import admin
from ecomapp.models import Products,Order

admin.site.register(Products)
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'totalPrice', 'createdAt')
    search_fields = ('user__username', 'id')
    list_filter = ('createdAt', 'isPaid')
