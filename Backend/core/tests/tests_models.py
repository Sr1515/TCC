from django.test import TestCase
from core.models import CustomUser, Game, Session, Player, BatchResult
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError

class PlayerModelTest(TestCase):
    
    def setUp(self):
        self.user = CustomUser.objects.create_user(email = "test@gmail.com", username = "tester", password="senha1234")
        self.game = Game.objects.create(name="Jogo Teste", description="Um jogo")
        self.session = Session.objects.create(game=self.game, organizer = self.user, max_participantes = 1)

    def test_player_creation(self):
        player = Player.objects.create(player_name = "Jogador 001", session = self.session)
        self.assertEqual(player.player_name, "Jogador 001")
        self.assertEqual(player.session, self.session)

    def test_limit_participantes(self):
        Player.objects.create(player_name = "Jogador 001", session = self.session)
        extra_player = Player(player_name = "Jogador 002", session = self.session)
        with self.assertRaises(ValidationError):
            extra_player.full_clean()

    def test_session_code_generation(self):
        session = Session.objects.create(game = self.game, organizer= self.user, max_participantes=2)
        self.assertIsNotNone(session.session_code)
        self.assertEqual(len(session.session_code), 8)

    def test_player_name_required(self):
        with self.assertRaises(ValidationError):
            player = Player(player_name = None, session = self.session)
            player.full_clean()

class GameModelTest(TestCase):

    def test_game_creation(self):
        game = Game.objects.create(name = "Jogo teste", description = "Some description game")
        self.assertEqual(game.name, "Jogo teste")
        self.assertEqual(game.description, "Some description game")

    def test_game_name_unique(self):
        Game.objects.create(name = "Jogo teste", description = "Some description game")
        other_game = Game(name = "Jogo teste", description = "Some description game")
        with self.assertRaises(ValidationError):
            other_game.full_clean()

class SessionModelTest(TestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(email = "test@gmail.com", username = "tester", password="senha1234")
        self.game = Game.objects.create(name="Jogo Teste", description="Um jogo")

    def test_session_creation(self):
        session = Session.objects.create(game = self.game, organizer = self.user, max_participantes = 2)
        self.assertIsNotNone(session.session_code)
        self.assertEqual(len(session.session_code), 8)
        self.assertEqual(session.organizer, self.user)
        self.assertEqual(session.game, self.game)

    def test_session_code_unique(self):
        session = Session.objects.create(game = self.game, organizer = self.user, max_participantes = 2)
        with self.assertRaises(IntegrityError):
            Session.objects.create(
            game=self.game,
            organizer=self.user,
            max_participantes=2,
            session_code=session.session_code
        )
    
    def test_creation_without_organizer(self):
        with self.assertRaises(IntegrityError):
            Session.objects.create(game=self.game, max_participantes=2)

    def test_creation_without_game(self):
        with self.assertRaises(IntegrityError):
            Session.objects.create(organizer = self.user, max_participantes=2)
        
class CustomUserModelTest(TestCase):
    
    def test_custom_user_creation(self):
        user = CustomUser.objects.create_user(email = "test@gmail.com", username = "tester", password="senha1234")
        self.assertEqual(user.email, "test@gmail.com")
        self.assertEqual(user.username, "tester")

    def test_email_is_unique(self):
        CustomUser.objects.create_user(email = "test@gmail.com", username = "tester", password="senha1234")
        with self.assertRaises(IntegrityError):
            CustomUser.objects.create(email = "test@gmail.com", username = "Dev", password="senha1234")

    def test_username_is_unique(self):
        CustomUser.objects.create_user(email = "test@gmail.com", username = "tester", password="senha1234")
        with self.assertRaises(IntegrityError):
            CustomUser.objects.create(email = "dev@gmail.com", username = "tester", password="senha1234")

class BatchResultTest(TestCase):
    
    def setUp(self):
        self.user = CustomUser.objects.create_user(email = "test@gmail.com", username = "tester", password="senha1234")
        self.game = Game.objects.create(name="Jogo Teste", description="Um jogo")
        self.session = Session.objects.create(game = self.game, organizer = self.user, max_participantes = 2)

    def test_bach_result_creation(self):
        batchResult = BatchResult.objects.create(session = self.session, data = {"aaa": "aaa"})
        self.assertEqual(batchResult.data, {"aaa": "aaa"})
        self.assertEqual(batchResult.session, self.session)