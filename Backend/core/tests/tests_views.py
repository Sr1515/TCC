from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from core.models import CustomUser, Game, Session, Player, Result
from rest_framework_simplejwt.tokens import RefreshToken

class APITestCaseWithAuth(APITestCase):

    def create_user_and_authenticate(self, username="user1", email="user1@test.com", password="password123"):
        self.user = CustomUser.objects.create_user(username=username, email=email, password=password)
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")
        return self.user

class APITestCase(APITestCaseWithAuth):

    def setUp(self):
        # Cria usuário e autentica
        self.user = self.create_user_and_authenticate()

        # Cria jogo e sessão
        self.game = Game.objects.create(name="Jogo Teste", description="Um jogo para teste")
        self.session = Session.objects.create(game=self.game, organizer=self.user, max_participantes=5)

    def test_list_games(self):
        url = "/api/games/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_create_game(self):
        url = "/api/games/"
        data = {"name": "Novo Jogo", "description": "Descrição do novo jogo"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["name"], "Novo Jogo")

    def test_list_sessions_authenticated(self):
        url = "/api/sessions/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_get_session_by_id(self):
        url = f"/api/sessions/{self.session.id}/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(str(self.session.id), response.data["id"]) 

    def test_add_player_to_session(self):
        url = "/api/players/"
        data = {"player_name": "Jogador 1", "session": self.session.id}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["player_name"], "Jogador 1")
        self.assertEqual(response.data["session"], self.session.id)

    def test_get_players_by_session(self):
        # Cria player
        player = Player.objects.create(player_name="Jogador 1", session=self.session)
        url = f"/api/players/?session={self.session.id}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]["player_name"], "Jogador 1")

    def test_create_custom_user(self):
        url = "/api/users/"
        data = {"username": "novo_usuario", "email": "novo@usuario.com", "password": "senha1234"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["username"], "novo_usuario")
