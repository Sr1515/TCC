from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.core.exceptions import ValidationError
from django.conf import settings

import uuid

class BaseModel(models.Model):
    id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False, unique =  True)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)

    class Meta:
        abstract = True

class CustomUserManager(UserManager):
    def create_superuser(self, username = None, email = None, password = None, **extra_fields):
        return super().create_superuser(username = username, email = email, password = password, **extra_fields)
    
class CustomUser(BaseModel, AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50, unique=True) 
    email = models.EmailField(max_length=100, unique=True)

    is_staff = models.BooleanField(
        "staff status",
        default=False,
        help_text="Designates whether the user can log into this admin site.",
    )

    is_active = models.BooleanField(
        "active",
        default=True,
        help_text="Designates whether this user should be treated as active. Unselect this instead of deleting accounts."
    )

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  
    EMAIL_FIELD = 'email'
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',  
        blank=True,
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_permissions', 
        blank=True,
    )

    def __str__(self):
        return self.username or self.email

class Game(BaseModel):
    name = models.CharField(max_length = 50, unique = True)
    description = models.TextField()

    def __str__(self):
        return self.name
    
class Session(BaseModel):
    session_code = models.CharField(max_length = 8, unique = True, blank=True)
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, related_name = 'sessions_created')
    game = models.ForeignKey(Game, on_delete = models.CASCADE, related_name = 'sessions')
    max_participantes = models.PositiveIntegerField(default = 4) 

    def save(self, *args, **kwargs):
        if not self.session_code:
            self.session_code = str(self.id).replace('-', '')[:8].upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'Session of game - {self.session_code} Criador{self.organizer.username}'
    
class Player(BaseModel):
    player_name = models.CharField(max_length=100)
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name='players')
    score = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    teamwork = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    communication = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    time_management = models.DecimalField(default=0, max_digits=5, decimal_places=2)

    def __str__(self):
        return f"Participação de {self.player_name} na Sessão {self.session.session_code}"
    
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def clean(self):
        if self.session.players.count() >= self.session.max_participantes:
            raise ValidationError("Número máximo de participantes atingido!") 
    
class Result(BaseModel):
    session = models.OneToOneField(Session, on_delete=models.CASCADE, related_name='results')
    data_result = models.JSONField() 

    def __str__(self):
        return f"Resultado da sessão {self.session.session_code}"

