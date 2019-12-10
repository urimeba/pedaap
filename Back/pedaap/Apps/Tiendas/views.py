from rest_framework import viewsets
from Apps.Tiendas.models import Tienda, TiendaProducto
from Apps.Tiendas.serializers import TiendaSerializer, TiendaProductoSerializer
from rest_framework.decorators import action


# Create your views here.
class TiendaViewSet(viewsets.ModelViewSet):
    queryset = Tienda.objects.all()
    serializer_class = TiendaSerializer

class TiendaProductoViewSet(viewsets.ModelViewSet):
    queryset = TiendaProducto.objects.all()
    serializer_class = TiendaProductoSerializer

    # @action(detail=False, methods=['post'])
    # def busqueda(self, request):
    #     idCategoria = request.data.get('idCategoria')
    #     # categoria = CategoriaProducto.objects.get(id=idCategoria)
    #
    #     # productos = Producto.objects.filter(categoria__id=idCategoria)
    #     # print(productos)
    #
    #     productosTienda = TiendaProducto.objects.filter(producto__categoria__id=idCategoria)
    #
    #     # for a in tiendas:
    #     #     print(a.id)
    #     #     print(a.tienda.nombre)
    #     #     print(a.producto.descripcion)
    #     #     print(a.costo)
    #
    #
    #     page = self.paginate_queryset(productosTienda)
    #     if page is not None:
    #         serializer = self.get_serializer(page, many=True)
    #         return self.get_paginated_response(serializer.data)
    #
    #     serializer = self.get_serializer(productosTienda, many=True)
    #     return Response(serializer.data)
