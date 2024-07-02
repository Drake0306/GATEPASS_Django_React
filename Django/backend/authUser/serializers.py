from .models import user
from .models import permission
# initilise 
from rest_framework import serializers

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = '__all__'

class permissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = permission
        fields = '__all__'