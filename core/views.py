from rest_framework import viewsets, permissions
from .models import CustomUser
from .serializers import CustomUserSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):

        if self.action in ['create', 'list']: 
            return [permissions.AllowAny()] 
        return super().get_permissions() 
