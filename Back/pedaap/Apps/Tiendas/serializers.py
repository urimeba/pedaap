from rest_framework import serializers
from Apps.Tiendas.models import Tienda, TiendaProducto

class TiendaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tienda
        fields = ['id','nombre','direccion', 'horaApertura', 'horaCierre', 'estado', 'icono']

class TiendaProductoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TiendaProducto
        fields = ['id','tienda','producto', 'costo']
