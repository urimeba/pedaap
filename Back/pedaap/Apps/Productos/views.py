from Apps.Productos.models import Producto, CategoriaProducto, RangoPrecioProducto
from Apps.Productos.serializers import ProductoSerializer, CategoriaProductoSerializer, RangoPrecioProductoSerializer
from rest_framework import viewsets

# Create your views here.
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class CategoriaProductoViewSet(viewsets.ModelViewSet):
    queryset = CategoriaProducto.objects.all()
    serializer_class = CategoriaProductoSerializer

class RangoPrecioProductoViewSet(viewsets.ModelViewSet):
    queryset = RangoPrecioProducto.objects.all()
    serializer_class = RangoPrecioProductoSerializer