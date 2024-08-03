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
    age = serializers.ReadOnlyField(source = 'user.age')
    workIn = serializers.ReadOnlyField(source = 'user.office')
    matched_clients = serializers.SerializerMethodField()
    # categories = serializers.PrimaryKeyRelatedField(queryset=AdvisorCategory.objects.all(), many=True)
    categories = serializers.SlugRelatedField(queryset=AdvisorCategory.objects.all(), many=True, slug_field='name')

    class Meta:
        model = Advisor
        fields = ['id','user','user_id','advisor_name','created_at','updated_at','age','work_experience','workIn','openlink','giveTalk','categories','matched_clients']
    
    def get_matched_clients(self, objects):
        clients = objects.matched_clients.all()
        return ClientSerializer(clients, many=True).data
    
    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        validated_data.pop('user', None)
        categories_data = validated_data.pop('categories')
        advisor = Advisor.objects.create(user=user, **validated_data)
        advisor.categories.set(categories_data)
        return advisor

class ClientSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    user_id = serializers.ReadOnlyField(source = 'user.id')
    age = serializers.ReadOnlyField(source = 'user.age')
    # categories = serializers.PrimaryKeyRelatedField(queryset=ClientCategory.objects.all(), many=True)
    categories = serializers.SlugRelatedField(queryset=ClientCategory.objects.all(), many=True, slug_field='name')
    accepted = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = Client
        fields = ['id','user','user_id','created_at','age','work_experience','categories','accepted']
        read_only_fields = ['matched_advisor']
    
    def create(self, validated_data):
        categories_data = validated_data.pop('categories')
        client = Client.objects.create(**validated_data)
        client.categories.set(categories_data)
        return client

