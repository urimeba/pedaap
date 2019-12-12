from Apps.Presupuestos.models import Presupuesto, PresupuestoCategorias, tipoEvento
from Apps.Presupuestos.serializers import PresupuestoSerializer, PresupuestoCategoriasSerializer, tipoEventoSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response

# Create your views here.
class PresupuestoViewSet(viewsets.ModelViewSet):
    queryset = Presupuesto.objects.all()
    serializer_class = PresupuestoSerializer

    @action(detail=False, methods=['post'])
    def busqueda(self, request):
        idUser = request.data.get("idUser")
        presupuestos = Presupuesto.objects.filter(usuario__id=idUser)

        # print(presupuestos)

        # page = self.paginate_queryset(presupuestos)
        # if page is not None:
        #     serializer = self.get_serializer(page, many=True)
        #     return self.get_paginated_response(serializer.data)
        #
        # serializer = self.get_serializer(presupuestos, many=True)
        # return Response(serializer.data)
        dic = {}

        for p in presupuestos:
            dic[str(p.id)] = {"id":str(p.id),"usuario": str(p.usuario), "tipoEvento":str(p.tipoEvento.nombre), "nombre":str(p.nombre), "montoMaximo":str(p.montoMaximo), "numeroPersonas": p.numeroPersonas }

        # print(dic)
        # dic = str(dic)
        # dic = dic.replace('\'', "\"")
        # print(dic)
        return Response({"Datos": str(dic)}, status=HTTP_200_OK)

class PresupuestoCategoriasViewSet(viewsets.ModelViewSet):
    queryset = PresupuestoCategorias.objects.all()
    serializer_class = PresupuestoCategoriasSerializer

class tipoEventoViewSet(viewsets.ModelViewSet):
    queryset = tipoEvento.objects.all()
    serializer_class = tipoEventoSerializer
