from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class User(AbstractUser):
    tienda = models.ForeignKey('Tiendas.Tienda', on_delete=models.CASCADE, null=True)
    rangoPrecios = models.ForeignKey('Productos.RangoPrecioProducto', on_delete=models.CASCADE,  null=True)
    categoriaProductos = models.ForeignKey('Productos.CategoriaProducto', on_delete=models.CASCADE,  null=True)
    telefono  = models.CharField(max_length=13, null=True)
    verificado = models.CharField(max_length=1, null=True)
