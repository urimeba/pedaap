from Apps.Notificaciones.models import Notificacion
from rest_framework import serializers

class NotificacionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Notificacion
        fields=['id', 'usuario', 'mensaje', 'estado']