from rest_framework import serializers
from .models import Thread, Post

# PUBLIC_INTERFACE
class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = '__all__'

# PUBLIC_INTERFACE
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
