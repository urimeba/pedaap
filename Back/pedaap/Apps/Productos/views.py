from Apps.Productos.models import Producto, CategoriaProducto
from Apps.Productos.serializers import ProductoSerializer, CategoriaProductoSerializer
from rest_framework import viewsets

# Create your views here.
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class CategoriaProductoViewSet(viewsets.ModelViewSet):
    queryset = CategoriaProducto.objects.all()
    serializer_class = CategoriaProductoSerializer