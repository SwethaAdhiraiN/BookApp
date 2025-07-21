from django.db import models
from users.models import User

# PUBLIC_INTERFACE
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=512)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
