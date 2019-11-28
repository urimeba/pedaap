from django.shortcuts import render
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import Group
from Apps.Usuarios.models import User
from Apps.Usuarios.serializers import UserSerializer, GroupSerializer
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

# Create your views here.
@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'Error':'Favor de completar los campos'}, status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({"Error":"Credenciales no validas"}, status=HTTP_404_NOT_FOUND)

    token, created = Token.objects.get_or_create(user=user)
    print(created)
    return Response({"token":token.key, "id":str(user.id), 'username':str(user.username)}, status=HTTP_200_OK)

@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def registro(request):
    username = request.data.get("usuario")
    password = request.data.get("password")
    email = request.data.get("correo")
    number = request.data.get("telefono")
    first_name = request.data.get("nombre")
    last_name = request.data.get("apellido")
    verificado = 0

    if username=="" or password=="" or (email=="" or number=="") or first_name=="" or last_name=="":
        return Response({"Error":"Favor de completar todos los campos"}, status=HTTP_400_BAD_REQUEST)
    else:
        user, created = User.objects.get_or_create(username=username)
        if created:
            user.set_password(password)
            user.email=email
            user.telefono=number
            user.first_name=first_name
            user.last_name=last_name
            user.verificado=verificado
            user.save()
            return Response({"Registrado": "Usuario registrado exitosamente"}, status=HTTP_200_OK)
        else:
            return Response({"Error": "El usuario ya existe"}, status=HTTP_400_BAD_REQUEST)


class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class GroupsViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer