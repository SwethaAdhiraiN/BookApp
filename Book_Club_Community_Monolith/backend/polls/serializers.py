from rest_framework import serializers
from .models import Poll, Choice

# PUBLIC_INTERFACE
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text', 'votes']

# PUBLIC_INTERFACE
class PollSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)
    class Meta:
        model = Poll
        fields = ['id', 'club', 'question', 'created_by', 'created_at', 'choices']
