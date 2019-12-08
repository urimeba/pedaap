from django.db import models
from django.conf import settings
import string
import random

def random_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for x in range(size))

# Create your models here.
class PresupuestoCompartido(models.Model):
    usuarioPropietario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=8, decimal_places=2)
    codigo = models.CharField(max_length=6,default=random_generator)

class UsuariosPresupuestoCompartido(models.Model):
    presupuestoCompartido = models.ForeignKey('PresupuestoCompartido', on_delete=models.CASCADE)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=8, decimal_places=2)

class CompartidoCategorias(models.Model):
    presupuestoCompartido = models.ForeignKey('PresupuestoCompartido', on_delete=models.CASCADE)
    categoria = models.ForeignKey('Productos.CategoriaProducto', on_delete=models.CASCADE)
