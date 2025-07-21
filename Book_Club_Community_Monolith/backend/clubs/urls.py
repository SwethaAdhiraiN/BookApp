from rest_framework.routers import DefaultRouter
from .views import BookClubViewSet

router = DefaultRouter()
router.register(r'', BookClubViewSet, basename='club')

urlpatterns = router.urls
