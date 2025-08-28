from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
from core.models import CustomUser, Game, Session, Player, Result

class CustomUserModelTest(TestCase):

    def setUp(self):
        self.user_data = {"email": "user@test.com", "username": "tester", "password": "1234"}

    def test_create_user(self):
        user = CustomUser.objects.create_user(**self.user_data)
        self.assertEqual(user.email, "user@test.com")

    def test_create_superuser(self):
        user = CustomUser.objects.create_superuser(email="admin@test.com", username="admin", password="1234")
        self.assertTrue(user.is_staff)

    def test_email_unique(self):
        CustomUser.objects.create_user(**self.user_data)
        with self.assertRaises(IntegrityError):
            CustomUser.objects.create_user(**self.user_data)

    def test_username_unique(self):
        CustomUser.objects.create_user(**self.user_data)
        with self.assertRaises(IntegrityError):
            CustomUser.objects.create_user(email="other@test.com", username="tester", password="1234")

    def test_str_method(self):
        user = CustomUser.objects.create_user(**self.user_data)
        self.assertEqual(str(user), "tester")

    def test_user_permissions(self):
        user = CustomUser.objects.create_user(**self.user_data)
        self.assertEqual(list(user.groups.all()), [])
        self.assertEqual(list(user.user_permissions.all()), [])

    def test_user_manager_create_superuser(self):
        manager = CustomUser.objects
        superuser = manager.create_superuser(email="admin2@test.com", username="admin2", password="1234")
        self.assertTrue(superuser.is_superuser)

class GameModelTest(TestCase):

    def setUp(self):
        self.game = Game.objects.create(name="Test Game", description="Desc")

    def test_game_creation(self):
        self.assertEqual(self.game.name, "Test Game")

    def test_game_unique_name(self):
        with self.assertRaises(IntegrityError):
            Game.objects.create(name="Test Game", description="Other")

    def test_game_str(self):
        self.assertEqual(str(self.game), "Test Game")

    def test_game_description(self):
        self.assertEqual(self.game.description, "Desc")

    def test_update_game(self):
        self.game.description = "New"
        self.game.save()
        self.assertEqual(Game.objects.get(id=self.game.id).description, "New")

    def test_delete_game(self):
        id = self.game.id
        self.game.delete()
        with self.assertRaises(Game.DoesNotExist):
            Game.objects.get(id=id)

    def test_game_auto_fields(self):
        self.assertIsNotNone(self.game.created_at)
        self.assertIsNotNone(self.game.updated_at)

class SessionModelTest(TestCase):

    def setUp(self):
        self.user = CustomUser.objects.create_user(email="test@gmail.com", username="tester", password="senha1234")
        self.game = Game.objects.create(name="Jogo Teste", description="Um jogo")
        self.session = Session.objects.create(game=self.game, organizer=self.user, max_participantes=1)

    def test_session_creation(self):
        session = Session.objects.create(game=self.game, organizer=self.user)
        self.assertEqual(session.organizer, self.user)

    def test_session_code_generated(self):
        session = Session.objects.create(game=self.game, organizer=self.user)
        self.assertEqual(len(session.session_code), 8)

    def test_status_default(self):
        session = Session.objects.create(game=self.game, organizer=self.user)
        self.assertEqual(session.status, "pendente")

    def test_duration_choices(self):
        session = Session.objects.create(game=self.game, organizer=self.user, duration=5)
        self.assertEqual(session.duration, 5)

    def test_session_str(self):
        session = Session.objects.create(game=self.game, organizer=self.user)
        self.assertIn("Session of game", str(session))

    def test_session_update(self):
        session = Session.objects.create(game=self.game, organizer=self.user)
        session.status = "concluida"
        session.save()
        self.assertEqual(Session.objects.get(id=session.id).status, "concluida")
