from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshSlidingView

urlpatterns = [
    path('admin/', admin.site.urls),
    # Register 
    path('api/user/register/', CreateUserView.as_view(), name="register"),
    path('api/token/', TokenObtainPairView.as_view(), name="get_token"),
    path('api/token/refresh/', TokenRefreshSlidingView.as_view(), name="refresh"),
    path('api-auth/', include("rest_framework.urls")),
    # Notes
    path('api/', include("api.urls"))

]
