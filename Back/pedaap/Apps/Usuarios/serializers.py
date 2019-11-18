from Apps.Usuarios.models import User
from django.contrib.auth.models import Group
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','first_name', 'last_name', 'telefono', 'verificado', 'categoriaProductos_id', 'rangoPrecios_id', 'tienda_id']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['id','name']
