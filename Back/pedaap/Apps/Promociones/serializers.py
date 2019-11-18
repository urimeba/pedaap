from Apps.Promociones.models import Promociones
from rest_framework import serializers

class PromocionesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Promociones
        fields=['id', 'tienda', 'producto', 'descripcion', 'fechaInicio', 'fechaVencimiento']