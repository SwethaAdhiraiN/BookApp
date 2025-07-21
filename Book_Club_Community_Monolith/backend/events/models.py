from django.db import models
from users.models import User
from clubs.models import BookClub

# PUBLIC_INTERFACE
class Event(models.Model):
    club = models.ForeignKey(BookClub, on_delete=models.CASCADE, related_name='events')
    name = models.CharField(max_length=128)
    description = models.TextField(blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    video_link = models.URLField(blank=True)
    rsvps = models.ManyToManyField(User, related_name='events_rsvp', blank=True)

    def __str__(self):
        return f"{self.name} ({self.club.name})"
