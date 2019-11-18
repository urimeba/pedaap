from Apps.Restaurantes.models import Restaurantes, RangoPrecioRestaurante, tipoComida
from Apps.Restaurantes.serializers import RestaurantesSerializer, RangoPrecioRestauranteSerializer, tipoComidaSerializer
from rest_framework import viewsets

# Create your views here.
class RestaurantesViewSet(viewsets.ModelViewSet):
    queryset = Restaurantes.objects.all()
    serializer_class = RestaurantesSerializer

class RangoPrecioRestauranteViewSet(viewsets.ModelViewSet):
    queryset = RangoPrecioRestaurante.objects.all()
    serializer_class = RangoPrecioRestauranteSerializer

class tipoComidaViewSet(viewsets.ModelViewSet):
    queryset = tipoComida.objects.all()
    serializer_class = tipoComidaSerializer