from Apps.Restaurantes.models import Restaurantes, RangoPrecioRestaurante, tipoComida
from rest_framework import serializers

class RestaurantesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Restaurantes
        fields=['id', 'rangoPrecio', 'tipoComida', 'nombre', 'direccion']

class RangoPrecioRestauranteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = RangoPrecioRestaurante
        fields=['id', 'nombre', 'descripcion', 'montoMinimo', 'montoMaximo']

class tipoComidaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = tipoComida
        fields=['id', 'nombre', 'descripcion']