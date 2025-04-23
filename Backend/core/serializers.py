from rest_framework import serializers
from .models import CustomUser, Game, Session, BatchResult, Player
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
    class Meta:
        model = Session
        fields = '__all__'

class BatchResultSerializer(serializers.ModelSerializer):
    session = serializers.PrimaryKeyRelatedField(queryset = Session.objects.all())
    data_ = serializers.JSONField
    class Meta:
        model = BatchResult
        fields = ['session', 'data', 'timestamp']

    
    def validade_data(self, value):

        if not isinstance(value, dict):
            raise serializers.ValidationError("O campo 'data' deve ser um dicionário.")
        
        for player_id, actions in value.items():

            if not Player.objects.filter(id = player_id).exists():
                raise serializers.ValidationError(f"Jogador com ID {player_id} não encontrado.")
            
            if not isinstance(actions, list):
                raise serializers.ValidationError(f"As ações do jogador {player_id} devem ser uma lista.")

        for action_data in actions:
                
                if not isinstance(action_data, dict):
                    raise serializers.ValidationError(f"Cada item de ação para o jogador {player_id} deve ser um dicionário.")
                
                if 'action' not in action_data or 'timestamp' not in action_data:
                    raise serializers.ValidationError(f"Cada ação do jogador {player_id} deve conter 'action' e 'timestamp'.")
                
                if not isinstance(action_data['action'], str):
                    raise serializers.ValidationError(f"A ação do jogador {player_id} deve ser uma string.")
                
                try:
                    datetime.strptime(action_data['timestamp'], '%d/%m %H:%M')
                except ValueError:
                    raise serializers.ValidationError(f"Timestamp do jogador {player_id} tem formato inválido. Use 'DD/MM HH:MM'.")
        
        return value
    
    def create(self, validated_data):
        return super().create(validated_data) 