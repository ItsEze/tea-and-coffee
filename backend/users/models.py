from django.contrib.auth.models import User
from django.db import models
from coffee_api.models import Coffee

class Users(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorites = models.ManyToManyField(Coffee, related_name='favorited_by', blank=True)
    first_name=models.TextField(max_length=50,blank=True)
    last_name=models.TextField(max_length=50,blank=True)
    about_me = models.CharField(max_length=250, blank=True)
    picture = models.FileField(upload_to="profile/", blank=True, null=True)

    def add_favorite(self, coffee_id):
        # Check if the coffee is not already in favorites
        if not self.favorites.filter(pk=coffee_id).exists():
            coffee = Coffee.objects.get(pk=coffee_id)
            print(coffee.reviews.all(), 'THESE ARE REVIEWS')
            self.favorites.add(coffee)
            return True
        return False

    def remove_favorite(self, coffee_id):
        # Check if the coffee is in favorites
        print('made it to remove')
        print(coffee_id, 'this is coffee_id arg')
        if self.favorites.filter(pk=coffee_id).exists():
            coffee = Coffee.objects.get(pk=coffee_id)
            self.favorites.remove(coffee)
            return True
        return False