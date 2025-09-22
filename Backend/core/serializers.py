from rest_framework import serializers
from .models import CustomUser, Game, Session, Result, Player
from django.contrib.auth.hashers import make_password
from datetime import datetime

class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'created_at', 'updated_at', 'password']


    def create(self, validated_data):
        password = validated_data.pop('password', None)

        if password:
            validated_data['password'] = make_password(password)
        
        user = super().create(validated_data)
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        instance = super().update(instance, validated_data)

        if password:
            instance.set_password(password)
            instance.save()
        
        return instance

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = '__all__'

class SessionSerializer(serializers.ModelSerializer):
    game_title = serializers.CharField(source='game.name', read_only=True)
    organizer_username = serializers.CharField(source='organizer.username', read_only=True)
    link = serializers.CharField(source='game.link', read_only=True) 

    class Meta:
        model = Session
        fields = [
            'id',
            'game', 
            'game_title', 
            'organizer',
            'organizer_username', 
            'session_code',
            'max_participantes',
            'duration',
            'created_at',
            'updated_at',
            'status',
            'link',
        ]

class ResultSerializer(serializers.ModelSerializer):
    session = serializers.CharField(write_only=True)
    
    class Meta:
        model = Result
        fields = ['session', 'data']

    def validate_session(self, value):
        try:
            session = Session.objects.get(session_code=value)
        except Session.DoesNotExist:
            raise serializers.ValidationError("Sessão não encontrada.")

        return session

    def validate_data(self, value):
        return value

    def create(self, validated_data):
        session_instance = validated_data.pop('session')
        return Result.objects.create(session=session_instance, **validated_data)