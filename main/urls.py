from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('main.urls')),   # 👈 THIS LINE IS CRITICAL
    path('admin/', admin.site.urls),
]
