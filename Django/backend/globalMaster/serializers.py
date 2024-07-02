from .models import employee
# initilise 
from rest_framework import serializers

class employeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = employee
        fields = '__all__'