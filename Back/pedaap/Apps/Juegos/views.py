from django.shortcuts import render
from rest_framework import viewsets
from Apps.Juegos.models import Preguntas, PreguntasRespuestas, Respuestas, Sala
from Apps.Juegos.serializers import PreguntasSerializer, PreguntasRespuestasSerializer, RespuestasSerializer, SalaSerializer

# Create your views here.
class SalaViewSet(viewsets.ModelViewSet):
    queryset = Sala.objects.all()
    serializer_class = SalaSerializer

class PreguntasViewSet(viewsets.ModelViewSet):
    queryset = Preguntas.objects.all()
    serializer_class = PreguntasSerializer

class PreguntasRespuestasViewSet(viewsets.ModelViewSet):
    queryset = PreguntasRespuestas.objects.all()
    serializer_class = PreguntasRespuestasSerializer

class RespuestasSerializerViewSet(viewsets.ModelViewSet):
    queryset = Respuestas.objects.all()
    serializer_class = RespuestasSerializer
