from .models import PublicDiary, PrivateDiary , Reaction
from rest_framework import serializers
from django.db.models import Count

     
class PublicDiarySerializer(serializers.ModelSerializer):
    
    reactions = serializers.SerializerMethodField()
    user_reaction = serializers.SerializerMethodField()

    class Meta:
        model = PublicDiary
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at', 'report_count']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

    def get_reactions(self, obj):
        reactions = obj.reactions.values('reaction').annotate(count=Count('reaction'))
        return {reaction['reaction']: reaction['count'] for reaction in reactions}
    
    def get_user_reaction(self, obj):
        request = self.context.get('request', None)
        if request is None:
            return None

        user = request.user
        if not user.is_authenticated:
            return None

        try:
            reaction = Reaction.objects.get(user=user, diary=obj)
            return {'user_reaction_type' : reaction.reaction}
        except Reaction.DoesNotExist:
            return None

class PrivateDiarySerializer(serializers.ModelSerializer):
     
    class Meta:
        model = PrivateDiary
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = ['user', 'diary', 'reaction']
        read_only_fields = ['user', 'diary']