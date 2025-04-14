from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, GameViewSet, PlayerViewSet, SessionViewSet, BatchResultViewSet

router = DefaultRouter()

router.register(r'users', CustomUserViewSet)
router.register(r'games', GameViewSet)
router.register(r'players', PlayerViewSet)
router.register(r'sessions', SessionViewSet)
router.register(r'batchs', BatchResultViewSet)

urlpatterns = router.urls
