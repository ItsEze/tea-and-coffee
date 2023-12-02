from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import SignupView, FavoriteCoffee
from users.views import UserProfile


urlpatterns = [
    path('get-token', obtain_auth_token),
    path('signup', SignupView.as_view()),
    path('users', FavoriteCoffee.as_view()),
    path('profile', UserProfile.as_view()),
]