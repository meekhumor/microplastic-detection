from django.urls import path, include
from rest_framework.routers import DefaultRouter
from monitoring import views

router = DefaultRouter()
router.register(r'locations', views.LocationViewSet)
router.register(r'readings', views.ReadingViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/health/', views.health_check),
    path('api/upload/csv/', views.upload_csv),
    path('api/reports/<str:report_type>/', views.generate_report),
]