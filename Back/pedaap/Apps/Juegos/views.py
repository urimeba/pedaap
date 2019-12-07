from django.shortcuts import render
from rest_framework import viewsets
from Apps.Juegos.models import Preguntas, PreguntasRespuestas, Respuestas
from Apps.Juegos.serializers import PreguntasSerializer, PreguntasRespuestasSerializer, RespuestasSerializer

# Create your views here.
class PreguntasViewSet(viewsets.ModelViewSet):
    queryset = Preguntas.objects.all()
    serializer_class = PreguntasSerializer

class PreguntasRespuestasViewSet(viewsets.ModelViewSet):
    queryset = PreguntasRespuestas.objects.all()
    serializer_class = PreguntasRespuestasSerializer

class RespuestasSerializerViewSet(viewsets.ModelViewSet):
    queryset = RespuestasSerializer.objects.all()
    serializer_class = RespuestasSerializer