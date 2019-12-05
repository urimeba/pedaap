from django.db import models

 # nombreCompleto = models.CharField(max_length=100)
    # periodo = models.ForeignKey('Periodo', on_delete=models.CASCADE)
    # carrera = models.ForeignKey('Carrera', on_delete=models.CASCADE)
    # aciertosTotales = models.DecimalField(max_digits=5, decimal_places=2)
    # genero = models.CharField(max_length=1, null=True, blank=True )
    # bachillerato = models.ForeignKey('Bachillerato', on_delete=models.CASCADE)
    # aceptado = models.CharField(max_length=1)

# Create your models here.
class Tienda(models.Model):
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=150)
    horaApertura = models.TimeField()
    horaCierre = models.TimeField()
    estado = models.CharField(max_length=1)
    icono = models.CharField(max_length=100)

class TiendaProducto(models.Model):
    tienda = models.ForeignKey('Tienda', on_delete=models.CASCADE)
    producto = models.ForeignKey('Productos.Producto', on_delete=models.CASCADE)
    


   