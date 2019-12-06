from Apps.Usuarios.models import User, UserTiendas, UserCategorias
from django.contrib.auth.models import Group
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','first_name', 'last_name', 'telefono', 'verificado']

class UserTiendasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserTiendas
        fields = ['id','user','tienda']

class UserCategoriasSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserCategorias
        fields = ['id','user','categoria']

class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['id','name']
