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
    user = serializers.ReadOnlyField(source = 'user.id')
    # age = serializers.ReadOnlyField(source = 'user.age')
    age = serializers.SerializerMethodField()
    workIn = serializers.ReadOnlyField(source = 'user.office')
    matched_clients = serializers.SerializerMethodField()
    categories = serializers.SlugRelatedField(queryset=AdvisorCategory.objects.all(), many=True, slug_field='name')

    class Meta:
        model = Advisor
        fields = ['id','user','advisor_name','created_at','updated_at','age','work_experience','workIn','openlink','giveTalk','categories','matched_clients']
    
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
    
    def get_age(self, obj):
        age = obj.user.age
        if age is None:
            return None
        
        if 20 <= age < 30:
            return '20대'
        elif 30 <= age < 40:
            return '30대'
        elif 40 <= age < 50:
            return '40대'
        elif 50 <= age < 60:
            return '50대'
        elif 60 <= age < 70:
            return '60대'
        else:
            return 'Unknown'

class ClientSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.id')
    age = serializers.SerializerMethodField()
    categories = serializers.SlugRelatedField(queryset=ClientCategory.objects.all(), many=True, slug_field='name')
    accepted = serializers.BooleanField(write_only=True, required=False)

    class Meta:
        model = Client
        fields = ['id','user','created_at','age','categories','accepted']
        read_only_fields = ['matched_advisor']
    
    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        validated_data.pop('user', None)
        categories_data = validated_data.pop('categories')
        client = Client.objects.create(user=user,**validated_data)
        client.categories.set(categories_data)
        return client
    
    def get_age(self, obj):
        age = obj.user.age
        if age is None:
            return None

        if 20 <= age < 24:
            return '20대 초반'
        elif 24 <= age < 27:
            return '20대 중반'
        elif 27 <= age <= 29:
            return '20대 후반'
        elif 30 <= age < 34:
            return '30대 초반'
        elif 34 <= age < 37:
            return '30대 중반'
        elif 37 <= age <= 39:
            return '30대 후반'
        elif 40 <= age < 44:
            return '40대 초반'
        elif 44 <= age < 47:
            return '40대 중반'
        elif 47 <= age <= 49:
            return '40대 후반'
        elif 50 <= age < 54:
            return '50대 초반'
        elif 54 <= age < 57:
            return '50대 중반'
        elif 57 <= age <= 59:
            return '50대 후반'
        elif 60 <= age < 64:
            return '60대 초반'
        else:
            return 'Unknown'

