from rest_framework import serializers
from accounts.models import User
from .models import Adviser, Client

#class UserSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = User
#        fields = ['USERNAME_FIELD', 'email']
 
class AdviserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adviser
        fields = [#'user', 
                  'id', 'age', 'work_experience', 'workln', 'openlink', 'giveTalk']

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = [#'user', 
                  'id', 'age', 'work_experience', 'purpose', 'matched_adviser']
        read_only_fields = ['matched_adviser']