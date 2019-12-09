from django.db import models

# Create your models here.
class Promociones(models.Model):
    productoTienda = models.ForeignKey('Tiendas.TiendaProducto', on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=200)
    fechaInicio = models.DateField(auto_now=False, auto_now_add=False)
    fechaVencimiento = models.DateField(auto_now=False, auto_now_add=False)
    foto = models.ImageField(upload_to='promociones/% Y/% m/% d/', height_field=None, width_field=None, max_length=100, null=True, blank=True)
    estado = models.SmallIntegerField(default=1)
    costo = models.DecimalField(max_digits=8, decimal_places=2, default=0)
