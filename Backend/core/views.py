from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CustomUser, Game, Player, Session, Result
from .serializers import CustomUserSerializer, GameSerializer, PlayerSerializer, SessionSerializer, ResultSerializer
from rest_framework import status
from uuid import UUID
from rest_framework.permissions import AllowAny

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
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=["get"], url_path="by-session-id/(?P<session_id>[0-9a-f-]{36})")
    def by_session_id(self, request, session_id=None):
        try:
            players = Player.objects.filter(session_id=session_id)
            serializer = self.get_serializer(players, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

    @action(detail=False, methods=["get"], url_path="by-session-code/(?P<session_code>[^/]+)")
    def by_session_code(self, request, session_code=None):
        try:
            session = Session.objects.get(session_code=session_code)
            players = Player.objects.filter(session=session)
            serializer = self.get_serializer(players, many=True)
            return Response(serializer.data)
        except Session.DoesNotExist:
            return Response({'error': 'Sessão não encontrada.'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all() 
    serializer_class = SessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Session.objects.filter(organizer=self.request.user)

    @action(
        detail=False, 
        methods=["get"], 
        url_path="by-session_code/(?P<session_code>[^/]+)", 
        permission_classes=[permissions.AllowAny]
    )
    def get_by_code(self, request, session_code=None):
        try:
            session = Session.objects.get(session_code=session_code)
            session_data = SessionSerializer(session).data
            
            return Response({
                "session": session_data,
            })
            
        except Session.DoesNotExist:
            return Response(
                {"error": "Sessão não encontrada."}, 
                status=status.HTTP_404_NOT_FOUND
            )

class ResultViewSet(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    permission_classes = [permissions.AllowAny]