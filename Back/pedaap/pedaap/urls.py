"""pedaap URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from Apps.Notificaciones import views as views_notificacion
from Apps.Usuarios import views as views_usuarios
from Apps.Tiendas import views as views_tienda
from Apps.Productos import views as views_productos
from Apps.Promociones import views as views_promociones
from Apps.Presupuestos import views as views_presupuestos
from Apps.PresupuestosCompartidos import views as views_compartidos
from Apps.Juegos import views as views_juego

router = routers.DefaultRouter()
router.register(r'usuarios', views_usuarios.UsuariosViewSet)
router.register(r'grupos', views_usuarios.GroupsViewSet)
router.register(r'tiendas', views_tienda.TiendaViewSet)
router.register(r'tiendaProductos', views_tienda.TiendaProductoViewSet)
router.register(r'productos', views_productos.ProductoViewSet)
router.register(r'categoriaProductos', views_productos.CategoriaProductoViewSet)
router.register(r'promociones', views_promociones.PromocionesViewSet)
router.register(r'presupuestos', views_presupuestos.PresupuestoViewSet)
router.register(r'presupuestosCategorias', views_presupuestos.PresupuestoCategoriasViewSet)
router.register(r'tiposEvento', views_presupuestos.tipoEventoViewSet)
router.register(r'compartidos', views_compartidos.PresupuestosCompartidosViewSet)
router.register(r'categoriasCompartido', views_compartidos.CompartidoCategoriasViewSet)
router.register(r'usuariosCompartido', views_compartidos.UsuariosPresupuestoCompartidoViewSet)
router.register(r'notificaciones', views_notificacion.NotificacionViewSet)
router.register(r'userTiendas', views_usuarios.UserTiendasViewSet)
router.register(r'userCategorias', views_usuarios.UserCategoriasViewSet)
router.register(r'salas', views_juego.SalaViewSet)
router.register(r'preguntas', views_juego.PreguntasViewSet)
router.register(r'respuestas', views_juego.RespuestasSerializerViewSet)
router.register(r'respuestasPreguntas', views_juego.PreguntasRespuestasViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('login/', views_usuarios.login),
    path('registro/', views_usuarios.registro),
    path('registro/', views_usuarios.registro),
    path('verificar/', views_usuarios.verificar),
    path('enviar_correo/', views_usuarios.enviar_correo),
]
