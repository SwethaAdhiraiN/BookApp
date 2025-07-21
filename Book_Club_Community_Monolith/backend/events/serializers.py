from rest_framework import serializers
from .models import Event

# PUBLIC_INTERFACE
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
