from Apps.Promociones.models import Promociones
from Apps.Promociones.serializers import PromocionesSerializer
from rest_framework import viewsets

# Create your views here.
class PromocionesViewSet(viewsets.ModelViewSet):
    queryset = Promociones.objects.all()
    serializer_class = PromocionesSerializer