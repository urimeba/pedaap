from django.db import models
from django.contrib.auth.models import AbstractUser
import random

# Create your models here.
def random_string():
    return random.randrange(100000, 999999)

class User(AbstractUser):
    tienda = models.ForeignKey('Tiendas.Tienda', on_delete=models.CASCADE, null=True)
    rangoPrecios = models.ForeignKey('Productos.RangoPrecioProducto', on_delete=models.CASCADE,  null=True)
    categoriaProductos = models.ForeignKey('Productos.CategoriaProducto', on_delete=models.CASCADE,  null=True)
    telefono  = models.CharField(max_length=14, null=True)
    verificado = models.CharField(max_length=1, null=True)
    codigo = models.PositiveIntegerField(default = random_string)
