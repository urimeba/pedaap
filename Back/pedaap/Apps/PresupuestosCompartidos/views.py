from Apps.PresupuestosCompartidos.models import PresupuestoCompartido, UsuariosPresupuestoCompartido, CompartidoCategorias
from Apps.PresupuestosCompartidos.serializers import PresupuestosCompartidoSerializer, UsuariosPresupuestoCompartidoSerializer, CompartidoCategoriasSerializer
from rest_framework import viewsets

# Create your views here.
class PresupuestosCompartidosViewSet(viewsets.ModelViewSet):
    queryset = PresupuestoCompartido.objects.all()
    serializer_class = PresupuestosCompartidoSerializer

class UsuariosPresupuestoCompartidoViewSet(viewsets.ModelViewSet):
    queryset = UsuariosPresupuestoCompartido.objects.all()
    serializer_class = UsuariosPresupuestoCompartidoSerializer

class CompartidoCategoriasViewSet(viewsets.ModelViewSet):
    queryset = CompartidoCategorias.objects.all()
    serializer_class = CompartidoCategoriasSerializer