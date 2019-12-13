from Apps.PresupuestosCompartidos.models import PresupuestoCompartido, UsuariosPresupuestoCompartido, CompartidoCategorias
from Apps.Promociones.models import Promociones
from Apps.Usuarios.models import User
from Apps.PresupuestosCompartidos.serializers import PresupuestosCompartidoSerializer, UsuariosPresupuestoCompartidoSerializer, CompartidoCategoriasSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from decimal import Decimal

# Create your views here.
class PresupuestosCompartidosViewSet(viewsets.ModelViewSet):
    queryset = PresupuestoCompartido.objects.all()
    serializer_class = PresupuestosCompartidoSerializer


    @action(methods=['post'], detail=False)
    def getPresupuesto(self, request):
        codigo = request.data.get("codigo")

        print("Codigo " , codigo)

        try:
            presupuesto = PresupuestoCompartido.objects.get(codigo=codigo)
            print(presupuesto)

            dic = {}


            dic[str(presupuesto.id)] = {"id":str(presupuesto.id), "monto":str(presupuesto.monto), "propietario":str(presupuesto.usuarioPropietario.username)}


            return Response({"Datos":str(dic)}, status=HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"Error": "Este presupuesto no existe"}, status=HTTP_400_BAD_REQUEST)

    @action(methods=['post'], detail=False)
    def getPresupuestos(self, request):
        idUser = request.data.get("idUser")

        presupuestos = PresupuestoCompartido.objects.filter(usuarioPropietario__id=idUser)
        # presupuestos2 = UsuariosPresupuestoCompartido.objects.filter(usuario__id=idUser)

        dic = {}
        for presupuesto in presupuestos:
            dic[str(presupuesto.id)] = {"id":str(presupuesto.id),"codigo":str(presupuesto.codigo), "monto":str(presupuesto.monto), "propietario":str(presupuesto.usuarioPropietario.username)}

        # for presupuesto in presupuestos2:
        #     dic[str(presupuesto.id)] = {"id":str(presupuesto.id),"codigo":str(presupuesto.codigo), "monto":str(presupuesto.monto), "propietario":str(presupuesto.usuarioPropietario.username)}

        print(dic)

        return Response({"Datos":str(dic)}, status=HTTP_200_OK)








class UsuariosPresupuestoCompartidoViewSet(viewsets.ModelViewSet):
    queryset = UsuariosPresupuestoCompartido.objects.all()
    serializer_class = UsuariosPresupuestoCompartidoSerializer

    @action(methods=['post'], detail=False)
    def getUsuariosCompartido(self, request):
        idPresupuesto = request.data.get("idPresupuesto")

        presupuesto = PresupuestoCompartido.objects.get(id=idPresupuesto)

        usuarios = UsuariosPresupuestoCompartido.objects.filter(presupuestoCompartido=presupuesto)

        # print(usuarios)

        dic = {}

        for u in usuarios:
            dic[str(u.id)] = {"id":u.id, "usuario":u.usuario.username, "monto":str(u.monto)}
            # print(u.id)
            # print(u.usuario)
            # print(u.monto)

        print(dic)
        return Response({"datos": str(dic)}, status=HTTP_200_OK)

    @action(methods=['post'], detail=False)
    def getCreateUser(self, request):
        idPresupuesto = request.data.get("idPresupuesto")
        idUsuario = request.data.get("idUsuario")
        print(idPresupuesto, idUsuario)

        try:
            user = UsuariosPresupuestoCompartido.objects.get(presupuestoCompartido__id=idPresupuesto, usuario__id=idUsuario )
            return Response({"detail": "Ya estas en este presupuesto"}, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            # raise
            usuario = User.objects.get(id=idUsuario)
            presupuesto = PresupuestoCompartido.objects.get(id=idPresupuesto)
            user = UsuariosPresupuestoCompartido(presupuestoCompartido=presupuesto, usuario=usuario, monto=0 )
            user.save()
            return Response({"detail": "Correcto"}, status=HTTP_200_OK)

    @action(methods=['post'], detail=False)
    def eliminarUsuario(self, request):
        idUsuario = request.data.get("idUsuario")
        print(idUsuario)
        return Response(status=HTTP_200_OK)

class CompartidoCategoriasViewSet(viewsets.ModelViewSet):
    queryset = CompartidoCategorias.objects.all()
    serializer_class = CompartidoCategoriasSerializer

    @action(methods=['post'], detail=False)
    def getCategorias(self, request):
        idPresupuesto = request.data.get("idPresupuesto")
        categorias = CompartidoCategorias.objects.filter(presupuestoCompartido__id=idPresupuesto).values('categoria')

        promociones = Promociones.objects.filter(productoTienda__producto__categoria__in=categorias)

        dic = {}

        for p in promociones:
            # id = str(p.id)
            # id = '""' + id + '""'
            # print(p.foto.name)
            dic[str(p.id)]={"id":str(p.id), "nombre":str(p.descripcion),'foto':str(p.foto.name), 'lugar':p.productoTienda.tienda.nombre, 'vigencia':str(p.fechaVencimiento), 'categoria':p.productoTienda.producto.categoria.nombre, 'descripcion':p.descripcion, 'direccion':p.productoTienda.tienda.direccion, 'costo':str(p.costo), 'icono':str(p.productoTienda.tienda.icono)}
            # dic[str(p.id)]={"id":str(p.id), "nombre":str(p.descripcion), 'lugar':p.productoTienda.tienda.nombre, 'vigencia':str(p.fechaVencimiento), 'categoria':p.productoTienda.producto.categoria.nombre, 'descripcion':p.descripcion, 'direccion':p.productoTienda.tienda.direccion, 'costo':str(p.costo), 'icono':str(p.productoTienda.tienda.icono)}
        return Response({"Datos": str(dic)}, status=HTTP_200_OK)
