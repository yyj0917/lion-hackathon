from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        
        user = User.objects.create_user(
            email = validated_data['email'],
            password = validated_data['password'],
            name=validated_data['name'],
            age=validated_data['age'],
            position=validated_data['position'],
            office=validated_data['office'],
            phonenumber=validated_data['phonenumber'],
            username=validated_data['username'],
        )
        return user
    
    class Meta:
        model = User
        fields = '__all__'

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'age', 'position', 'office', 'phonenumber', 'username']