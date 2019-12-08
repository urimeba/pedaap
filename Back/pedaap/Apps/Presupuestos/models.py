from django.db import models
from django.conf import settings

# nombreCompleto = models.CharField(max_length=100)
    # periodo = models.ForeignKey('Periodo', on_delete=models.CASCADE)
    # carrera = models.ForeignKey('Carrera', on_delete=models.CASCADE)
    # aciertosTotales = models.DecimalField(max_digits=5, decimal_places=2)
    # genero = models.CharField(max_length=1, null=True, blank=True )
    # bachillerato = models.ForeignKey('Bachillera

# Create your models here.
class Presupuesto(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tipoEvento = models.ForeignKey('tipoEvento', on_delete=models.CASCADE)
    nombre = models.CharField(max_length=50)
    montoMaximo = models.DecimalField(max_digits=8, decimal_places=2)
    numeroPersonas = models.PositiveSmallIntegerField()

class tipoEvento(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    descripcion = models.CharField(max_length=100)

class PresupuestoCategorias(models.Model):
    presupuesto = models.ForeignKey('Presupuesto', on_delete=models.CASCADE)
    categoria = models.ForeignKey('Productos.CategoriaProducto', on_delete=models.CASCADE)