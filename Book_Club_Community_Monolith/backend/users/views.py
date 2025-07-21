from rest_framework import generics, permissions, status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .models import User, UserProfile
from .serializers import UserSerializer, RegisterSerializer, UserProfileSerializer
from rest_framework.decorators import action

# PUBLIC_INTERFACE
class RegisterView(generics.CreateAPIView):
    """User registration endpoint."""
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

# PUBLIC_INTERFACE
class LoginView(APIView):
    """User login endpoint."""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return Response({'message': 'Login successful', 'user': UserSerializer(user).data})
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# PUBLIC_INTERFACE
class LogoutView(APIView):
    """User logout endpoint."""
    def post(self, request):
        logout(request)
        return Response({'message': 'Logged out'})

# PUBLIC_INTERFACE
class UserViewSet(viewsets.ModelViewSet):
    """User CRUD and profile/API."""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['GET'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['POST'], url_path="set_mfa")
    def set_mfa(self, request):
        enable = request.data.get('enable', True)
        request.user.mfa_enabled = bool(enable)
        request.user.save()
        return Response({'mfa_enabled': request.user.mfa_enabled})
