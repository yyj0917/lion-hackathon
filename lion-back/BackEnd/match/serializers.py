from rest_framework import serializers
from accounts.models import User
from .models import Adviser, Client

class UserSerializer(serializers.ModelSerializer):
   class Meta:
       model = User
       fields = ['username', 'email']
 
class AdviserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adviser
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'
        read_only_fields = ['matched_adviser']