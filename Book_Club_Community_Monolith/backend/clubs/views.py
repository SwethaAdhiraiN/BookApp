from rest_framework import viewsets, permissions
from .models import BookClub, Membership
from .serializers import BookClubSerializer, MembershipSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

# PUBLIC_INTERFACE
class BookClubViewSet(viewsets.ModelViewSet):
    queryset = BookClub.objects.all()
    serializer_class = BookClubSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        club = self.get_object()
        member, created = Membership.objects.get_or_create(user=request.user, club=club)
        club.members.add(request.user)
        return Response({'joined': True})

    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        club = self.get_object()
        try:
            member = Membership.objects.get(user=request.user, club=club)
            member.delete()
            club.members.remove(request.user)
        except Membership.DoesNotExist:
            pass
        return Response({'left': True})
