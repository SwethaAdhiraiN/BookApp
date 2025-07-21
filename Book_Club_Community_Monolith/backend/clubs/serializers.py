from rest_framework import serializers
from .models import BookClub, Membership
from users.serializers import UserSerializer

# PUBLIC_INTERFACE
class BookClubSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    class Meta:
        model = BookClub
        fields = ['id', 'name', 'description', 'owner', 'members', 'created_at']

# PUBLIC_INTERFACE
class MembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Membership
        fields = ['id', 'user', 'club', 'is_moderator', 'joined_at']
