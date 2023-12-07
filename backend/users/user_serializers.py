from rest_framework import serializers
from coffee_reviews.serializers import ReviewSerializer
from .models import Users, Coffee

class CoffeeSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Coffee
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    favorites = CoffeeSerializer(many=True, read_only=True)
    username = serializers.SerializerMethodField()

    def get_username(self, obj):
        return obj.user.username if obj.user else None

    class Meta:
        model = Users
        fields = '__all__'
