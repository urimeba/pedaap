from Apps.Promociones.models import Promociones
from Apps.Promociones.serializers import PromocionesSerializer
from rest_framework import viewsets
from Apps.Usuarios.models import User, UserTiendas, UserCategorias
from Apps.Tiendas.models import Tienda, TiendaProducto
from Apps.Productos.models import Producto, CategoriaProducto
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

# Create your views here.
class PromocionesViewSet(viewsets.ModelViewSet):
    queryset = Promociones.objects.all()
    serializer_class = PromocionesSerializer

    @action(detail=False)
    def tiendasFav(self, request):
        # idUser = request.data.get('idUser')
        idUser = int("4")

        user = User.objects.get(id=idUser)
        # print(user.username)

        tiendasUsuario = UserTiendas.objects.filter(user=user).values('tienda')
        tiendas = Tienda.objects.filter(id__in=tiendasUsuario)
        # print(tiendas)

        categoriasUsuario = UserCategorias.objects.filter(user=user).values('categoria')
        categorias = CategoriaProducto.objects.filter(id__in=categoriasUsuario)
        # print(categorias)

        productos = TiendaProducto.objects.filter(tienda__in=tiendas, producto__categoria__in=categorias)
        # print(productos)

        promociones = Promociones.objects.filter(productoTienda__in=productos)
        print(promociones)


        page = self.paginate_queryset(promociones)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(promociones, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def getPromos(self, request):
        promociones = Promociones.objects.all()
        # print(promociones)

        dic = {}

        for p in promociones:
            dic[str(p.id)]={'id':p.id, "nombre":p.descripcion, 'lugar':p.productoTienda.tienda.nombre, 'vigencia':str(p.fechaVencimiento), 'categoria':p.productoTienda.producto.categoria.nombre, 'descripcion':p.descripcion, 'direccion':p.productoTienda.tienda.direccion, 'costo':str(p.costo)}
            # print(p.id)
            # print(p.descripcion)
            # print(p.productoTienda.tienda.nombre)
            # print(p.fechaVencimiento)
            # print(p.productoTienda.producto.categoria.nombre)
            # print(p.descripcion)
            # print(p.productoTienda.tienda.direccion)

        # print(dic)


        # page = self.paginate_queryset(promociones)
        # if page is not None:
        #     serializer = self.get_serializer(page, many=True)
        #     return self.get_paginated_response(serializer.data)
        #
        # serializer = self.get_serializer(promociones, many=True)
        # return Response(serializer.data)
        return Response({"Datos": str(dic)}, status=HTTP_200_OK)






        # return Response({"Exito":"Categorias eliminadas"}, status=HTTP_200_OK)
