from rest_framework import serializers
from accounts.models import User
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
   class Meta:
       model = User
       fields = ['username', 'id']
 
class AdvisorSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    user_id = serializers.ReadOnlyField(source = 'user.id')
    matched_clients = serializers.SerializerMethodField()
    categories = CategorySerializer(many=True)

    class Meta:
        model = Advisor
        fields = ['id','user','user_id','age','work_experience','workIn','openlink','giveTalk','categories','matched_clients']
    
    def get_matched_clients(self, objects):
        clients = objects.matched_clients.all()
        return ClientSerializer(clients, many=True).data

class ClientSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    user_id = serializers.ReadOnlyField(source = 'user.id')
    categories = CategorySerializer(many=True)

    class Meta:
        model = Client
        fields = ['id','user','user_id','age','work_experience','categories']
        read_only_fields = ['matched_advisor']
