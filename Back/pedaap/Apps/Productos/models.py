from django.db import models

# nombreCompleto = models.CharField(max_length=100)
    # periodo = models.ForeignKey('Periodo', on_delete=models.CASCADE)
    # carrera = models.ForeignKey('Carrera', on_delete=models.CASCADE)
    # aciertosTotales = models.DecimalField(max_digits=5, decimal_places=2)
    # genero = models.CharField(max_length=1, null=True, blank=True )
    # bachillerato = models.ForeignKey('Bachillerato', on_delete=models.CASCADE)
    # aceptado = models.CharField(max_length=1)

# Create your models here.
class Producto(models.Model):
    categoria = models.ForeignKey('CategoriaProducto', on_delete=models.CASCADE)
    rangoPrecios = models.ForeignKey('RangoPrecioProducto', on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=100)
    costo = models.DecimalField(max_digits=8, decimal_places=2)

class CategoriaProducto(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=100)

class RangoPrecioProducto(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=100)
    montoMinimo = models.DecimalField(max_digits=8, decimal_places=2)
    montoMaximo = models.DecimalField(max_digits=8, decimal_places=2)