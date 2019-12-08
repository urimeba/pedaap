from django.shortcuts import render
from rest_framework import viewsets
from Apps.Notificaciones.models import Notificacion
from Apps.Notificaciones.serializers import NotificacionSerializer

# Create your views here.
class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer