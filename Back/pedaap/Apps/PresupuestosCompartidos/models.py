from django.db import models
from django.conf import settings

# nombreCompleto = models.CharField(max_length=100)
    # periodo = models.ForeignKey('Periodo', on_delete=models.CASCADE)
    # carrera = models.ForeignKey('Carrera', on_delete=models.CASCADE)
    # aciertosTotales = models.DecimalField(max_digits=5, decimal_places=2)
    # genero = models.CharField(max_length=1, null=True, blank=True )
    # bachillerato = models.ForeignKey('Bachillera

# Create your models here.
class PresupuestoCompartido(models.Model):
    usuarioPropietario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    monto = models.DecimalField(max_digits=8, decimal_places=2)

class UsuariosPresupuestoCompartido(models.Model):
    presupuestoCompartido = models.ForeignKey('PresupuestoCompartido', on_delete=models.CASCADE)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

class CompartidoCategorias(models.Model):
    presupuestoCompartido = models.ForeignKey('PresupuestoCompartido', on_delete=models.CASCADE)
    categoria = models.ForeignKey('Productos.CategoriaProducto', on_delete=models.CASCADE)  