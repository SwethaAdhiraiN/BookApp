from rest_framework import viewsets, permissions
from users.models import User
from clubs.models import BookClub
from forums.models import Thread, Post
from polls.models import Poll
from notifications.models import Notification
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView

# PUBLIC_INTERFACE
class AdminDashboardView(APIView):
    """Superuser/admin dashboard - get stats"""
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        return Response({
            'users': User.objects.count(),
            'clubs': BookClub.objects.count(),
            'threads': Thread.objects.count(),
            'polls': Poll.objects.count(),
            'notifications': Notification.objects.count()
        })
