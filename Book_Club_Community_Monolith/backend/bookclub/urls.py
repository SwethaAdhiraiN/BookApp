from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/clubs/', include('clubs.urls')),
    path('api/events/', include('events.urls')),
    path('api/forums/', include('forums.urls')),
    path('api/polls/', include('polls.urls')),
    path('api/notifications/', include('notifications.urls')),
    path('api/adminpanel/', include('adminpanel.urls')),
]
