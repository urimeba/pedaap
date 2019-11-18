from Apps.Presupuestos.models import Presupuesto, PresupuestoCategorias, tipoEvento
from rest_framework import serializers

class PresupuestoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Presupuesto
        fields=['id', 'usuario', 'tipoEvento', 'nombre', 'montoMaximo', 'numeroPersonas']

class PresupuestoCategoriasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PresupuestoCategorias
        fields=['id', 'presupuesto', 'categoria']

class tipoEventoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = tipoEvento
        fields=['id', 'nombre', 'descripcion']