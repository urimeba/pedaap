from Apps.Productos.models import Producto, CategoriaProducto
from Apps.Tiendas.models import TiendaProducto
from Apps.Tiendas.serializers import TiendaSerializer, TiendaProductoSerializer
from Apps.Productos.serializers import ProductoSerializer, CategoriaProductoSerializer
from rest_framework import viewsets
from rest_framework.decorators import action

# Create your views here.
class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

    @action(detail=False, methods=['post'])
    def busqueda(self, request):
        idCategoria = request.data.get('idCategoria')
        categoria = CategoriaProducto.objects.get(id=idCategoria)

        productos = Producto.objects.filter(categoria__id=idCategoria)
        # print(productos)

        # productosTienda = TiendaProducto.objects.filter(producto__categoria=categoria)

        # for a in tiendas:
        #     print(a.id)
        #     print(a.tienda.nombre)
        #     print(a.producto.descripcion)
        #     print(a.costo)


        page = self.paginate_queryset(productos)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(productos, many=True)
        return Response(serializer.data)

class CategoriaProductoViewSet(viewsets.ModelViewSet):
    queryset = CategoriaProducto.objects.all()
    serializer_class = CategoriaProductoSerializer
