from django.test import TestCase
from core.models import CustomUser, Game, Session, Player
from core.serializers import CustomUserSerializer, GameSerializer, SessionSerializer, PlayerSerializer, ResultSerializer

class CustomUserSerializerTest(TestCase):

    def setUp(self):
        self.user_main = CustomUser.objects.create_user(
            email="main@test.com", username="mainuser", password="senha1234"
        )
        self.game = Game.objects.create(name="Jogo Teste", description="Um jogo")
        self.session = Session.objects.create(game=self.game, organizer=self.user_main, max_participantes=2)

    def test_create_serializer(self):
        user_data = {
            "email": "user1@test.com",
            "username": "user1",
            "password": "senha1234"
        }
        serializer = CustomUserSerializer(data=user_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        user = serializer.save()
        self.assertEqual(user.email, "user1@test.com")

    def test_update_serializer_password(self):
        user = CustomUser.objects.create_user(email="user2@test.com", username="user2", password="oldpass")
        serializer = CustomUserSerializer(user, data={"password": "newpass"}, partial=True)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        updated = serializer.save()
        self.assertTrue(updated.check_password("newpass"))

    def test_serializer_fields(self):
        serializer = CustomUserSerializer(data={
            "email": "user3@test.com",
            "username": "user3",
            "password": "senha1234"
        })
        self.assertIn("email", serializer.fields)

    def test_game_serializer(self):
        game = Game.objects.create(name="G1", description="D1")
        serializer = GameSerializer(game)
        self.assertEqual(serializer.data["name"], "G1")

    def test_session_serializer_read_only_fields(self):
        serializer = SessionSerializer(self.session)
        self.assertEqual(serializer.data["organizer_username"], self.user_main.username)

    def test_player_serializer(self):
        player = Player.objects.create(player_name="P1", session=self.session)
        serializer = PlayerSerializer(player)
        self.assertEqual(serializer.data["player_name"], "P1")

    def test_result_serializer_validate_session(self):
        serializer = ResultSerializer(data={
            "session": self.session.session_code,
            "data": [
                {"actor_1": {"action": "score", "value": 10}}
            ]
        })
        self.assertTrue(serializer.is_valid(), serializer.errors)
        result = serializer.save()
        self.assertEqual(result.session, self.session)
        self.assertEqual(result.data, [
            {"actor_1": {"action": "score", "value": 10}}
        ])

