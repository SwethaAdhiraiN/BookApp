from rest_framework.routers import DefaultRouter
from .views import ThreadViewSet, PostViewSet

router = DefaultRouter()
router.register(r'threads', ThreadViewSet, basename='thread')
router.register(r'posts', PostViewSet, basename='post')

urlpatterns = router.urls
