from django.urls import path
from . import views

urlpatterns = [
    path('frankfurter/', views.frankfurter, name='frankfurter'),
    
]