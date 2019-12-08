from rest_framework import viewsets
from Apps.Tiendas.models import Tienda, TiendaProducto
from Apps.Tiendas.serializers import TiendaSerializer, TiendaProductoSerializer


# Create your views here.
class TiendaViewSet(viewsets.ModelViewSet):
    queryset = Tienda.objects.all()
    serializer_class = TiendaSerializer

class TiendaProductoViewSet(viewsets.ModelViewSet):
    queryset = TiendaProducto.objects.all()
    serializer_class = TiendaProductoSerializer