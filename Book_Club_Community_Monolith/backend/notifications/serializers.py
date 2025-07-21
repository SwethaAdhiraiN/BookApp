from rest_framework import serializers
from .models import Notification

# PUBLIC_INTERFACE
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
