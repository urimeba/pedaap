from Apps.Presupuestos.models import Presupuesto, PresupuestoCategorias, tipoEvento
from Apps.Presupuestos.serializers import PresupuestoSerializer, PresupuestoCategoriasSerializer, tipoEventoSerializer
from rest_framework import viewsets

# Create your views here.
class PresupuestoViewSet(viewsets.ModelViewSet):
    queryset = Presupuesto.objects.all()
    serializer_class = PresupuestoSerializer

class PresupuestoCategoriasViewSet(viewsets.ModelViewSet):
    queryset = PresupuestoCategorias.objects.all()
    serializer_class = PresupuestoCategoriasSerializer

class tipoEventoViewSet(viewsets.ModelViewSet):
    queryset = tipoEvento.objects.all()
    serializer_class = tipoEventoSerializer