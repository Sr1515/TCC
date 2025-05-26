from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CustomUser, Game, Player, Session, BatchResult
from .serializers import CustomUserSerializer, GameSerializer, PlayerSerializer, SessionSerializer, BatchResultSerializer
from rest_framework import status
from uuid import UUID

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

    @action(detail=False, methods=["get"], url_path="by-session/(?P<session_id>[0-9a-f-]{36})")
    def by_session(self, request, session_id=None):
        try:
            session_uuid = UUID(session_id)  

            players = Player.objects.filter(session_id=session_uuid)
            serializer = self.get_serializer(players, many=True)
            return Response(serializer.data)
        except ValueError:
            return Response({'error': 'UUID inválido.'}, status=400)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

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