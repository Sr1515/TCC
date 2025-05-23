from rest_framework import viewsets, permissions
from .models import CustomUser, Game, Player, Session, BatchResult
from .serializers import CustomUserSerializer, GameSerializer, PlayerSerializer, SessionSerializer, BatchResultSerializer

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):

        if self.action in ['create', 'list']: 
            return [permissions.AllowAny()] 
        return super().get_permissions() 

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [permissions.IsAuthenticated]

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [permissions.IsAuthenticated]

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all() 
    serializer_class = SessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Session.objects.filter(organizer=self.request.user)


class BatchResultViewSet(viewsets.ModelViewSet):
    queryset = BatchResult.objects.all()
    serializer_class = BatchResultSerializer
    permission_classes = [permissions.IsAuthenticated]