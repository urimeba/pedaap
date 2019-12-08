from Apps.PresupuestosCompartidos.models import PresupuestoCompartido, UsuariosPresupuestoCompartido, CompartidoCategorias
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



class UsuariosPresupuestoCompartidoViewSet(viewsets.ModelViewSet):
    queryset = UsuariosPresupuestoCompartido.objects.all()
    serializer_class = UsuariosPresupuestoCompartidoSerializer

    @action(methods=['post'], detail=False)
    def getUsuariosCompartido(self, request):
        idPrespusto = request.data.get("id")

        presupuesto = PresupuestoCompartido.objects.get(id=idPrespusto)

        usuarios = UsuariosPresupuestoCompartido.objects.filter(presupuestoCompartido=presupuesto)

        # print(usuarios)

        dic = {}

        for u in usuarios:
            dic[u.id] = {"id":u.id, "usuario":u.usuario.username, "monto":str(u.monto)}
            # print(u.id)
            # print(u.usuario)
            # print(u.monto)

        print(dic)
        return Response({"datos": str(dic)}, status=HTTP_200_OK)

class CompartidoCategoriasViewSet(viewsets.ModelViewSet):
    queryset = CompartidoCategorias.objects.all()
    serializer_class = CompartidoCategoriasSerializer
