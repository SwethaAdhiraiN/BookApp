from rest_framework import viewsets, permissions
from .models import Poll, Choice
from .serializers import PollSerializer, ChoiceSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

# PUBLIC_INTERFACE
class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=['post'])
    def vote(self, request, pk=None):
        poll = self.get_object()
        choice_id = request.data.get('choice')
        try:
            choice = poll.choices.get(id=choice_id)
            choice.votes.add(request.user)
            choice.save()
            return Response({'voted': True})
        except Choice.DoesNotExist:
            return Response({'error': 'Invalid choice'}, status=400)
