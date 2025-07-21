from django.db import models
from users.models import User
from clubs.models import BookClub

# PUBLIC_INTERFACE
class Poll(models.Model):
    club = models.ForeignKey(BookClub, on_delete=models.CASCADE, related_name='polls')
    question = models.CharField(max_length=256)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

# PUBLIC_INTERFACE
class Choice(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name='choices')
    text = models.CharField(max_length=128)
    votes = models.ManyToManyField(User, blank=True, related_name='votes')
