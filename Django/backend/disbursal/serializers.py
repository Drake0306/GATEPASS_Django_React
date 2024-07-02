from .models import disbursalRegistration
from .models import disbursalBT
# initilise 
from rest_framework import serializers

class disbursalRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = disbursalRegistration
        fields = '__all__'

class disbursalBTSerializer(serializers.ModelSerializer):
    class Meta:
        model = disbursalBT
        fields = '__all__'