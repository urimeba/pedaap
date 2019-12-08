from Apps.Productos.models import Producto, CategoriaProducto
from rest_framework import serializers

class ProductoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Producto
        fields=['id', 'categoria', 'descripcion']

class CategoriaProductoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CategoriaProducto
        fields=['id', 'nombre', 'descripcion', 'icono']