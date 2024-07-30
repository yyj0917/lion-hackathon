from rest_framework import serializers
from accounts.models import User
from .models import Advisor, Client

class UserSerializer(serializers.ModelSerializer):
   class Meta:
       model = User
       fields = ['username', 'id']
 
class AdvisorSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    user_id = serializers.ReadOnlyField(source = 'user.id')
    matched_clients = serializers.SerializerMethodField()

    class Meta:
        model = Advisor
        fields = ['id','user','user_id','age','work_experience','workIn','openlink','giveTalk','category','matched_clients']
    
    def get_matched_clients(self, objects):
        clients = objects.matched_clients.all()
        return ClientSerializer(clients, many=True).data

class ClientSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    user_id = serializers.ReadOnlyField(source = 'user.id')

    class Meta:
        model = Client
        fields = '__all__'
        read_only=['matched_advisor']
