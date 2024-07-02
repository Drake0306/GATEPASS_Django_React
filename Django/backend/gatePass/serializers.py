from .models import gatePass
# initilise 
from rest_framework import serializers

class gatePassSerializer(serializers.ModelSerializer):
    class Meta:
        model = gatePass
        fields = '__all__'