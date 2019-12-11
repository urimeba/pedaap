from Apps.Promociones.models import Promociones
from Apps.Promociones.serializers import PromocionesSerializer
from rest_framework import viewsets
from Apps.Usuarios.models import User, UserTiendas, UserCategorias
from Apps.Tiendas.models import Tienda, TiendaProducto
from Apps.Notificaciones.models import Notificacion
from Apps.Productos.models import Producto, CategoriaProducto
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
import datetime
import dateutil.parser

# Create your views here.
class PromocionesViewSet(viewsets.ModelViewSet):
    queryset = Promociones.objects.all()
    serializer_class = PromocionesSerializer

    @action(detail=False, methods=['post'])
    def tiendasFav(self, request):
        idUser = request.data.get('idUser')
        # idUser = int("4")

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
            # id = str(p.id)
            # id = '""' + id + '""'
            dic[str(p.id)]={"id":str(p.id), "nombre":str(p.descripcion), 'lugar':p.productoTienda.tienda.nombre, 'vigencia':str(p.fechaVencimiento), 'categoria':p.productoTienda.producto.categoria.nombre, 'descripcion':p.descripcion, 'direccion':p.productoTienda.tienda.direccion, 'costo':str(p.costo), 'icono':str(p.productoTienda.tienda.icono)}
        return Response({"Datos": str(dic)}, status=HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def busqueda(self, request):
        clave = request.data.get("clave")
        # print(clave)

        promociones = Promociones.objects.filter( Q(descripcion__icontains=clave) | Q(productoTienda__tienda__nombre__icontains=clave) | Q(productoTienda__tienda__direccion__icontains=clave) | Q(productoTienda__producto__descripcion__icontains=clave)  | Q(productoTienda__tienda__direccion__icontains=clave) | Q(productoTienda__producto__categoria__nombre__icontains=clave) | Q(productoTienda__producto__categoria__descripcion__icontains=clave)  )
        # print(promociones)

        dic = {}

        for p in promociones:
            # dic[str(p.id)]={'id':p.id, "nombre":p.descripcion, 'lugar':p.productoTienda.tienda.nombre, 'vigencia':str(p.fechaVencimiento), 'categoria':p.productoTienda.producto.categoria.nombre, 'descripcion':p.descripcion, 'direccion':p.productoTienda.tienda.direccion, 'costo':str(p.costo)}
            dic[str(p.id)]={'id':p.id, "nombre":p.descripcion, 'lugar':p.productoTienda.tienda.nombre, 'vigencia':str(p.fechaVencimiento), 'categoria':p.productoTienda.producto.categoria.nombre, 'descripcion':p.descripcion, 'direccion':p.productoTienda.tienda.direccion, 'costo':str(p.costo), 'icono':str(p.productoTienda.tienda.icono)}

        return Response({"Datos": str(dic)}, status=HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def alta(self, request):
        descripcion = request.data.get("descripcion")
        fechaInicio = request.data.get("fechaInicio")
        fechaVencimiento = request.data.get("fechaVencimiento")
        foto = request.FILES["foto"]
        estado = 0
        costo = request.data.get("costo")
        producto = (request.data.get("producto"))
        tienda = (request.data.get("tienda"))
        idUser = (request.data.get("idUser"))

        print(costo, descripcion)

        prod = Producto.objects.get(id=producto)
        tien = Tienda.objects.get(id=tienda)
        user = User.objects.get(id=idUser)

        productoTienda, created1 = TiendaProducto.objects.get_or_create(producto=prod, tienda=tien)
        print(productoTienda)

        if(descripcion=="" or fechaInicio=="" or fechaVencimiento=="" or costo=="" or producto=="" or tienda==""):
            return Response({"Error":"Favor de completar los datos"}, status=HTTP_404_NOT_FOUND)
        elif(len(descripcion)<15):
            return Response({"Error":"Mejora la descripción de la promoción"}, status=HTTP_404_NOT_FOUND)
        else:

            try:
                costo = int(costo)
            except Exception as e:
                # raise
                print(e)
                return Response({"Error":"Ingresa un costo correcto"}, status=HTTP_404_NOT_FOUND)


            # date_time_str = fechaInicio
            # date_time_obj = datetime.datetime.strptime(date_time_str, '%Y-%m-%d')
            # print('Date:', date_time_obj.date())
            # print('Time:', date_time_obj.time())
            # print('Date-time:', date_time_obj)


            a = dateutil.parser.parse(fechaInicio)
            b = dateutil.parser.parse(fechaVencimiento)


            promo, created2 = Promociones.objects.get_or_create(productoTienda=productoTienda,fechaInicio=a, fechaVencimiento=b, costo=costo  )
            if created2:
                promo.descripcion=descripcion
                promo.foto=foto
                promo.estado=0
                promo.usuario=user
                promo.save()

                noti = Notificacion(usuario=user, mensaje="Has enviado una promocion. Espera a que sea verificada. +100pts", estado=0)
                noti.save()


            else:
                promo.estado=1
                promo.save()

                noti = Notificacion(usuario=user, mensaje="Has verificado una promocion. +80pts", estado=0)
                noti.save()

            print(promo)


        return Response({"Exito": "Hola"}, status=HTTP_200_OK)
