from .models import optionPrepareReport
# initilise 
from rest_framework import serializers

class optionPrepareReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = optionPrepareReport
        fields = '__all__'