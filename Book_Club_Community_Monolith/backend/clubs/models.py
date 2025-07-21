from django.db import models
from users.models import User

# PUBLIC_INTERFACE
class BookClub(models.Model):
    name = models.CharField(max_length=128)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owned_clubs')
    members = models.ManyToManyField(User, related_name='clubs')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

# PUBLIC_INTERFACE
class Membership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    club = models.ForeignKey(BookClub, on_delete=models.CASCADE)
    is_moderator = models.BooleanField(default=False)
    joined_at = models.DateTimeField(auto_now_add=True)
