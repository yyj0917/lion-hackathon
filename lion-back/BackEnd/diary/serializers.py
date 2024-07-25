from .models import PublicDiary, PrivateDiary
from rest_framework import serializers

class PublicDiarySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PublicDiary
        fields = '__all__'

class PrivateDiarySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PrivateDiary
        fields = '__all__'

