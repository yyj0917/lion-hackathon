from .models import PublicDiary, PrivateDiary #, Reaction
from rest_framework import serializers
from django.db.models import Count

# class ReactionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Reaction
#         fields = ['user', 'diary', 'reaction']
#         read_only_fields = ['user', 'diary']
     
class PublicDiarySerializer(serializers.ModelSerializer):
    
    # reactions = serializers.SerializerMethodField()

    class Meta:
        model = PublicDiary
        fields = '__all__'

    # def get_reactions(self, obj):
    #     reactions = obj.reactions.values('reaction').annotate(count=Count('reaction'))
    #     return {reaction['reaction']: reaction['count'] for reaction in reactions}


class PrivateDiarySerializer(serializers.ModelSerializer):
     
    class Meta:
        model = PrivateDiary
        fields = '__all__'


# class ReactionSerializer(serializers.ModelSerializer) :

#     class Meta:
#         model = Reaction
#         fields = '__all__'