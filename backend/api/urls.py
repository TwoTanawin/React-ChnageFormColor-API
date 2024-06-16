from django.urls import path
from .views import RandomRGBView

urlpatterns = [
    path('random/', RandomRGBView.as_view(), name='random_numbers'),
]