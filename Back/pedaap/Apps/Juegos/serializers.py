from Apps.Juegos.models import Preguntas, PreguntasRespuestas, Respuestas, Sala
from rest_framework import serializers

class SalaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Sala
        fields=['id', 'creador', 'codigo', 'participantes', 'estado']

class PreguntasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Preguntas
        fields=['id', 'pregunta', 'estatus']

class PreguntasRespuestasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PreguntasRespuestas
        fields=['id', 'pregunta', 'respuesta', 'correcta']

class RespuestasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Respuestas
        fields=['id', 'respuesta', 'estatus']
