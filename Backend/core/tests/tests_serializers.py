from django.test import TestCase
from core.models import Player, CustomUser, Game, Session
from core.serializers import PlayerSerializer

class PlayerSerializerTest(TestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(email = "test@gmail.com", username = "tester", password="senha1234")
        self.game = Game.objects.create(name="Jogo Teste", description="Um jogo")
        self.session = Session.objects.create(game=self.game, organizer = self.user, max_participantes = 1)

    def test_player_serializer_valid(self):
        
        player = Player.objects.create(player_name = "Jogador 001", session = self.session)

        serializer = PlayerSerializer(player)
        self.assertEqual(serializer.data['player_name'], "Jogador 001")
        self.assertEqual(str(serializer.data['session']), str(self.session.id))