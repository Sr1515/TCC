from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.contrib import admin
from django.urls import path, include
from core.urls import urlpatterns as urlpatter

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.auth_urls')),
    path('api/', include(urlpatter))
]
