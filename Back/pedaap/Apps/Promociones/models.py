from django.db import models

# nombreCompleto = models.CharField(max_length=100)
    # periodo = models.ForeignKey('Periodo', on_delete=models.CASCADE)
    # carrera = models.ForeignKey('Carrera', on_delete=models.CASCADE)
    # aciertosTotales = models.DecimalField(max_digits=5, decimal_places=2)
    # genero = models.CharField(max_length=1, null=True, blank=True )
    # bachillerato = models.ForeignKey('Bachillerato', on_delete=models.CASCADE)
    # aceptado = models.CharField(max_length=1)

# Create your models here.
class Promociones(models.Model):
    tienda = models.ForeignKey('Tiendas.Tienda', on_delete=models.CASCADE)
    producto = models.ForeignKey('Productos.Producto', on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=200)
    fechaInicio = models.DateField(auto_now=False, auto_now_add=False)
    fechaVencimiento = models.DateField(auto_now=False, auto_now_add=False)
    foto = models.ImageField(upload_to='promociones/% Y/% m/% d/', height_field=None, width_field=None, max_length=100, null=True, blank=True)
    estado = models.SmallIntegerField(default=1)
    costo = models.DecimalField(max_digits=8, decimal_places=2, default=0)