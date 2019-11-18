from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.
class User(AbstractUser):
    tienda = models.ForeignKey('Tiendas.Tienda', on_delete=models.CASCADE)
    rangoPrecios = models.ForeignKey('Productos.RangoPrecioProducto', on_delete=models.CASCADE)
    categoriaProductos = models.ForeignKey('Productos.CategoriaProducto', on_delete=models.CASCADE)
    telefono  = models.CharField(max_length=13)
    verificado = models.CharField(max_length=1)
