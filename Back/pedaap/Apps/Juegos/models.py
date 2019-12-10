from django.db import models
from django.conf import settings
import string
import random

def random_generator(size=6, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for x in range(size))

# Create your models here.
class Sala(models.Model):
    creador = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    codigo = models.CharField(max_length=6,default=random_generator)
    participantes = models.PositiveIntegerField()

class Preguntas(models.Model):
    pregunta = models.CharField(max_length=150, unique=True)
    estatus = models.SmallIntegerField()
#
class PreguntasRespuestas(models.Model):
    pregunta = models.ForeignKey('Preguntas', on_delete=models.CASCADE, null=True)
    respuesta = models.ForeignKey('Respuestas', on_delete=models.CASCADE, null=True)
    correcta = models.SmallIntegerField()

class Respuestas(models.Model):
    respuesta = models.CharField(max_length=200)
    estatus = models.SmallIntegerField()
