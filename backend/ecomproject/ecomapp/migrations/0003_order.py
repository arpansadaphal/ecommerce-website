# Generated by Django 5.1.3 on 2024-12-22 15:12

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("ecomapp", "0002_products_numreviews"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Order",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("orderItems", models.JSONField()),
                ("shippingAddress", models.JSONField()),
                ("paymentMethod", models.CharField(max_length=200)),
                ("itemsPrice", models.DecimalField(decimal_places=2, max_digits=10)),
                ("shippingPrice", models.DecimalField(decimal_places=2, max_digits=10)),
                ("taxPrice", models.DecimalField(decimal_places=2, max_digits=10)),
                ("totalPrice", models.DecimalField(decimal_places=2, max_digits=10)),
                ("isPaid", models.BooleanField(default=False)),
                ("paidAt", models.DateTimeField(blank=True, null=True)),
                ("createdAt", models.DateTimeField(auto_now_add=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
