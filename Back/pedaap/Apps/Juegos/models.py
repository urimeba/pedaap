from django.db import models

# Create your models here.
class Preguntas(models.Model):
    pregunta = models.CharField(max_length=150, unique=True)
    estatus = models.SmallIntegerField(max_length=1)
#
class PreguntasRespuestas(models.Model):
    pregunta = models.ForeignKey('Preguntas', on_delete=models.CASCADE, null=True)
    respuesta = models.ForeignKey('Respuestas', on_delete=models.CASCADE, null=True)
    correcta = models.SmallIntegerField(max_length=1)

class Respuestas(models.Model):
    respuesta = models.CharField(max_length=200)
    estatus = models.SmallIntegerField(max_length=1)
