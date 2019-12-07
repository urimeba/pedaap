from Apps.PresupuestosCompartidos.models import PresupuestoCompartido, UsuariosPresupuestoCompartido, CompartidoCategorias
from rest_framework import serializers

class PresupuestosCompartidoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PresupuestoCompartido
        fields=['id', 'usuarioPropietario', 'monto', 'codigo']

class UsuariosPresupuestoCompartidoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UsuariosPresupuestoCompartido
        fields=['id', 'presupuestoCompartido', 'usuario']

class CompartidoCategoriasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CompartidoCategorias
        fields=['id', 'presupuestoCompartido', 'categoria']
