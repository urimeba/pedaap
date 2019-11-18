from Apps.Productos.models import Producto, CategoriaProducto, RangoPrecioProducto
from rest_framework import serializers

class ProductoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Producto
        fields=['id', 'categoria', 'rangoPrecios', 'descripcion', 'costo']

class CategoriaProductoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CategoriaProducto
        fields=['id', 'nombre', 'descripcion']

class RangoPrecioProductoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RangoPrecioProducto
        fields=['id', 'nombre', 'descripcion', 'montoMinimo', 'montoMaximo']