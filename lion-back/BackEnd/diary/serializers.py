from .models import PublicDiary, PrivateDiary, Comment, Like
from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):
    # user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Comment
        # fields = ['id', 'user', 'diary', 'content', 'created_at'] # user 완성 후 변경 예정
        fields = '__all__'

# class LikeSerializer(serializers.ModelSerializer):
#     # user = serializers.StringRelatedField(read_only=True)

#     class Meta:
#         model = Like
#         # fields = ['id', 'user', 'diary'] # user 완성 후 변경 예정
#         fields = ['id', 'diary']
        
class PublicDiarySerializer(serializers.ModelSerializer):
    
    # comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = PublicDiary
        fields = '__all__'

class PrivateDiarySerializer(serializers.ModelSerializer):
     
    class Meta:
        model = PrivateDiary
        fields = '__all__'
