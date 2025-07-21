from rest_framework import viewsets, permissions
from .models import Thread, Post
from .serializers import ThreadSerializer, PostSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

# PUBLIC_INTERFACE
class ThreadViewSet(viewsets.ModelViewSet):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

# PUBLIC_INTERFACE
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
