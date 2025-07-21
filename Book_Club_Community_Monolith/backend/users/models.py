from django.contrib.auth.models import AbstractUser
from django.db import models

# PUBLIC_INTERFACE
class User(AbstractUser):
    """Custom user model for the Book Club Community."""
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    mfa_enabled = models.BooleanField(default=False)
    # Add any additional fields here

    def __str__(self):
        return self.username

# PUBLIC_INTERFACE
class UserProfile(models.Model):
    """Profile and privacy settings for a user."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    is_private = models.BooleanField(default=False)
    # Add more settings fields as needed
    def __str__(self):
        return f"Profile of {self.user.username}"
