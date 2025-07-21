from django.db import models
from users.models import User
from clubs.models import BookClub

# PUBLIC_INTERFACE
class Thread(models.Model):
    club = models.ForeignKey(BookClub, on_delete=models.CASCADE, related_name='threads')
    title = models.CharField(max_length=256)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='threads')
    is_review = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

# PUBLIC_INTERFACE
class Post(models.Model):
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE, related_name='posts')
    message = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    created_at = models.DateTimeField(auto_now_add=True)
    is_moderated = models.BooleanField(default=False)
