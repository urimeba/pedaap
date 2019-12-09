from django.shortcuts import render
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import Group
from twilio.rest import Client
from django.conf import settings
from Apps.Usuarios.models import User, UserTiendas, UserCategorias
from Apps.Tiendas.models import Tienda
from Apps.Usuarios.serializers import UserSerializer, GroupSerializer, UserTiendasSerializer, UserCategoriasSerializer
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
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import action

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

    tiendas = UserTiendas.objects.filter(user=user)
    tiendas = tiendas.count()

    categorias = UserCategorias.objects.filter(user=user)
    categorias = categorias.count()

    # print(user.verificado)

    if int(user.verificado)==1:
        # print("VERIFICADO")
        return Response({"token":token.key, "id":str(user.id), "verificado":str(user.verificado), "tiendas":str(tiendas), "categorias":str(categorias)}, status=HTTP_200_OK)
    else:
        # print("NO VERIFICADO")
        to = user.telefono
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        client.messages.create(
            body='Codigo de verificación: ' + str(user.codigo),
            to=to, from_=settings.TWILIO_PHONE_NUMBER)
        return Response({"token":token.key, "id":str(user.id), "verificado":str(user.verificado), "tiendas":str(tiendas), "categorias":str(categorias)}, status=HTTP_200_OK)


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def registro(request):

    username = request.data.get("usuario")
    password = request.data.get("password")
    email = request.data.get("correo")
    number = request.data.get("telefono")
    verificado = 0

    # print(username, password, email, number)
    # print(len(number))

    if username==None or password==None or email==None or number==None:
        print("a")
        return Response({"Error":"Favor de completar todos los campos"}, status=HTTP_400_BAD_REQUEST)
    elif 6>len(username):
        print("b")
        return Response({"Error":"Favor de usar un usuario con mas de 6 caracteres"}, status=HTTP_400_BAD_REQUEST)
    elif 6>len(password):
        print("c")
        return Response({"Error":"Favor de usar una contraseña con mas de 6 caracteres"}, status=HTTP_400_BAD_REQUEST)
    elif 10!=len(number) :
        print("d")
        return Response({"Error":"Favor de ingresar un teléfono válido"}, status=HTTP_400_BAD_REQUEST)

    try:
        number = int(number)
        number = "+52" + str(number)
    except Exception as e:
        # raise
        print("EXCEPT 1")
        print(e)
        return Response({"Error":"Favor de ingresar un teléfono válido"}, status=HTTP_400_BAD_REQUEST)

    else:
        try:
                try:

                    user, created = User.objects.get_or_create(username=username, telefono=number, email=email )
                    print(number)



                    try:
                        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
                        to = number
                        client.messages.create(
                            body='Codigo de verificación: ' + str(user.codigo),
                            to=to, from_=settings.TWILIO_PHONE_NUMBER)
                    except Exception as e:
                        # raise
                        print("EXCEPT TWILIO")
                        print(e)
                        return Response({"Error":"Favor de ingresar un teléfono válido"}, status=HTTP_400_BAD_REQUEST)


                    print(created)

                    if created:
                        user.set_password(password)
                        user.email=email
                        user.telefono=number
                        user.verificado=verificado
                        user.save()
                        token, created = Token.objects.get_or_create(user=user)
                        return Response({"Registrado": "Usuario registrado exitosamente", "token":token.key, "id":str(user.id)}, status=HTTP_200_OK)
                    else:
                        return Response({"Error": "El usuario, telefono o correo ya han sido usados "}, status=HTTP_400_BAD_REQUEST)
                except Exception as e:
                    # raise
                    print("EXCEPT 2")
                    print(e)
                    return Response({"Error": "El usuario, telefono o correo ya han sido usados "}, status=HTTP_400_BAD_REQUEST)

        except Exception as e:
            # print("except")
            print(e)
            print("EXCEPT 3")
            return Response({"Error": "El usuario, telefono o correo ya han sido usados "}, status=HTTP_400_BAD_REQUEST)

# @csrf_exempt
@api_view(["POST"])
# @permission_classes((AllowAny,))
def verificar(request):
    idUser = request.data.get("idUser")
    codigo = request.data.get("codigo")

    if idUser is None or codigo is None:
        return Response({'Error':'Favor de completar los campos'}, status=HTTP_400_BAD_REQUEST)

    user = User.objects.get(id=idUser)

    if codigo == str(user.codigo):
        user.verificado=1
        user.save()

        tiendas = UserTiendas.objects.filter(user=user)
        tiendas = tiendas.count()


        categorias = UserCategorias.objects.filter(user=user)
        categorias = categorias.count()


        return Response({"tiendas":tiendas, "categorias":categorias}, status=HTTP_200_OK)

    else:
        return Response(status=HTTP_400_BAD_REQUEST)

# @csrf_exempt
@api_view(["POST"])
# @permission_classes((AllowAny,))
def enviar_correo(request):
    idUser = request.data.get("idUser")

    if idUser is None:
        return Response({'Error':'Favor de completar los campos'}, status=HTTP_400_BAD_REQUEST)

    user = User.objects.get(id=idUser)

    subject = 'Codigo de verificación Fiestaap'
    message = 'Ingresa el siguiente codigo para verificar su cuenta: ' +  str(user.codigo)
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [str(user.email),]
    send_mail( subject, message, email_from, recipient_list )
    return Response({"Exito":"Correo enviado correctamente"}, status=HTTP_200_OK)


class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'])
    def actualizarDatos(self, request):
        username = request.data.get('username')
        nombre = request.data.get('nombre')
        apellido = request.data.get('apellido')
        correo = request.data.get('correo')
        telefono = request.data.get('telefono')
        pass1 = request.data.get('pass1')
        pass2 = request.data.get('pass2')

        print(username, nombre, apellido, correo, telefono, pass1, pass2)

        usuario = User.objects.get(username=username)

        try:
            # pass
            tel = int(telefono)

        except Exception as e:
            # raise
            return Response({'Error':'Favor de ingresar un teléfono válido'}, status=HTTP_400_BAD_REQUEST)

        try:
            telefono="+52"+telefono
            print(telefono)
            usuario2 = User.objects.get(email=correo)
            print(usuario2)
            if(usuario!=usuario2):
                return Response({'Error':'El correo ya esta siendo usado'}, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            # raise
            print(e)
            # return Response({'Error':'El correo ya esta siendo usado'}, status=HTTP_400_BAD_REQUEST)

        try:
            usuario3 = User.objects.get(telefono=telefono)
            print(usuario3)
            if(usuario!=usuario3):
                return Response({'Error':'El telefono ya esta siendo usado'}, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            # raise
            print(e)
            # return Response({'Error':'El correo ya esta siendo usado'}, status=HTTP_400_BAD_REQUEST)


        if(len(telefono)>13 or len(telefono)<13):
            print(len(telefono))
            return Response({'Error':'Favor de ingresar un teléfono válido'}, status=HTTP_400_BAD_REQUEST)
        if(pass1=="" and pass2==""):
            usuario.first_name = nombre
            usuario.last_name = apellido
            usuario.email = correo
            usuario.telefono = telefono
            usuario.save()
            return Response({"Exito":"Datos actualizados"}, status=HTTP_200_OK)
        elif (pass1==pass2):
            if(len(pass1)<6):
                return Response({'Error':'La contraseña debe tener 6 caracteres o mas'}, status=HTTP_400_BAD_REQUEST)
            usuario.first_name = nombre
            usuario.last_name = apellido
            usuario.email = correo
            usuario.telefono = telefono
            usuario.set_password(pass1)
            usuario.save()
            return Response({"Exito":"Datos actualizados"}, status=HTTP_200_OK)
        else:
            return Response({"Error":"Las contraseñas no coinciden"}, status=HTTP_400_BAD_REQUEST)





class UserTiendasViewSet(viewsets.ModelViewSet):
    queryset = UserTiendas.objects.all()
    serializer_class = UserTiendasSerializer

    @action(detail=False, methods=['post'])
    def eliminarTienda(self, request):
        idUser = request.data.get('idUser')
        idTienda = request.data.get('idTienda')
        user = User.objects.get(id=idUser)
        tienda = Tienda.objects.get(id=idTienda)
        UserTiendas.objects.filter(user=user,tienda=tienda).delete()
        return Response({"Exito":"Categorias eliminadas"}, status=HTTP_200_OK)


class UserCategoriasViewSet(viewsets.ModelViewSet):
    queryset = UserCategorias.objects.all()
    serializer_class = UserCategoriasSerializer

    @action(detail=False, methods=['post'])
    def eliminarCategoria(self, request):
        idUser = request.data.get('idUser')
        idCategoria = request.data.get('idCategoria')
        user = User.objects.get(id=idUser)
        UserCategorias.objects.filter(user=user).delete()
        return Response({"Exito":"Categorias eliminadas"}, status=HTTP_200_OK)

class GroupsViewSet(viewsets.ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
