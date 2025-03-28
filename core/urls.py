from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet

router = DefaultRouter()
router.register(r'users', CustomUserViewSet)

urlpatterns = router.urls
