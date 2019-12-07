from Apps.Juegos.models import Preguntas, PreguntasRespuestas, Respuestas
from rest_framework import serializers

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