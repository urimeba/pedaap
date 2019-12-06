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
        idUser = int("44")

        user = User.objects.get(id=idUser)
        # print(user.username)

        tiendasUsuario = UserTiendas.objects.filter(user=user).values('tienda')
        tiendas = Tienda.objects.filter(id__in=tiendasUsuario)
        print(tiendas)

        categoriasUsuario = UserCategorias.objects.filter(user=user).values('categoria')
        categorias = CategoriaProducto.objects.filter(id__in=categoriasUsuario)
        print(categorias)

        productos = TiendaProducto.objects.filter(tienda__in=tiendas, producto__categoria__in=categorias)
        # print(productos)

        for a in productos:
            print(a)



        # recent_libros = libro.objects.all().order_by('-titulo')
        #
        # page = self.paginate_queryset(recent_libros)
        # if page is not None:
        #     serializer = self.get_serializer(page, many=True)
        #     return self.get_paginated_response(serializer.data)
        #
        # serializer = self.get_serializer(recent_libros, many=True)
        # return Response(serializer.data)


        return Response({"Exito":"Categorias eliminadas"}, status=HTTP_200_OK)
