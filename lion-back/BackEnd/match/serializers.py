from rest_framework import serializers
from accounts.models import User
from .models import *

class ClientCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientCategory
        fields = '__all__'

class AdvisorCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = AdvisorCategory
        fields = '__all__'
 
class AdvisorSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    user_id = serializers.ReadOnlyField(source = 'user.id')
    matched_clients = serializers.SerializerMethodField()
    categories = serializers.PrimaryKeyRelatedField(queryset=AdvisorCategory.objects.all(), many=True)

    class Meta:
        model = Advisor
        fields = ['id','user','user_id','age','work_experience','workIn','openlink','giveTalk','matched_clients']
    
    def get_matched_clients(self, objects):
        clients = objects.matched_clients.all()
        return ClientSerializer(clients, many=True).data
    
    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        categories_data = validated_data.pop('categories')
        advisor = Advisor.objects.create(user=user, **validated_data)
        advisor.categories.set(categories_data)
        return advisor

class ClientSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    user_id = serializers.ReadOnlyField(source = 'user.id')
    categories = serializers.PrimaryKeyRelatedField(queryset=ClientCategory.objects.all(), many=True)
    accepted = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = Client
        fields = ['id','user','user_id','age','work_experience','categories','accepted']
        read_only_fields = ['matched_advisor']
    
    def create(self, validated_data):
        categories_data = validated_data.pop('categories')
        client = Client.objects.create(**validated_data)
        client.categories.set(categories_data)
        return client
