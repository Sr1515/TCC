from rest_framework import serializers
from .models import CustomUser, Game, Session, Result, Player
from django.contrib.auth.hashers import make_password

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

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = '__all__'