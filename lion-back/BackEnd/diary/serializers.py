from .models import Diary
from rest_framework import serializers

class DiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = '__all__'


# class DiarySerializerExceptSentiment(serializers.ModelSerializer):
#     class Meta:
#         model = Diary
#         fields = ['title', 'body', 'date', 'created_at', 'updated_at']