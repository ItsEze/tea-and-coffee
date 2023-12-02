from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from coffee_api.models import Coffee
from coffee_reviews.models import Review
from coffee_api.serializers import CoffeeSerializer
from coffee_reviews.serializers import ReviewSerializer

class CoffeeReview(APIView):
    def get(self, request):
        reviews = Review.objects.order_by('pk')
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        review_data = request.data  # Assuming the data contains the necessary fields for a review
        user = request.user
        coffee_id = review_data.get('coffee_id')  # Assuming there's a field in the data to identify the coffee

        try:
            coffee = Coffee.objects.get(pk=coffee_id)
        except Coffee.DoesNotExist:
            return Response({"error": "Coffee not found"}, status=404)

        # Assuming your review_data contains 'username', 'text', and 'rating'
        username = user.username
        text = review_data.get('text')
        rating = review_data.get('rating')

        # Add the review to the coffee using the add_review method
        coffee.add_review(username=username, text=text, rating=rating)
        # Serialize the updated coffee object
        serializer = CoffeeSerializer(coffee)
        
        return Response(serializer.data)
      
    def put(self, request):
        review_data = request.data
        pk = review_data.get('pk')
        coffee_id = review_data.get('coffee_id')
        review = Review.objects.get(pk=pk)
        review.text = review_data.get('text')
        review.rating = review_data.get('rating')
        review.save()
        coffee = Coffee.objects.get(id=coffee_id)
        coffee.update_rating()

        serializer = ReviewSerializer(review)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request):
        review_data = request.data
        pk = review_data.get('pk')
        review = Review.objects.get(pk=pk)
        review.delete()
        coffee_id = review_data.get('coffee_id')
        coffee = Coffee.objects.get(pk=coffee_id)
        coffee.update_rating()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CoffeeLikes(APIView):
    def get(self, request):
        user = request.user
        user_reviews = Review.objects.filter(user=user)
        serializer = ReviewSerializer(user_reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    def post(self, request):
        review_data = request.data
        review_id = review_data.get('review_id')
        print(review_id, 'chjecking REVIEW id in coffee likes POST')
        user = request.user

        try:
            review = Review.objects.get(pk=review_id)
        except Review.DoesNotExist:
            return Response({"error": "Review not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if the user has already liked the review
        is_liked = review.liked_by.filter(username=user.username).exists()

        if is_liked:
            # User has already liked the review, remove the like
            review.liked_by.remove(user)
        else:
            # User hasn't liked the review, add the like
            review.liked_by.add(user)

        # Serialize the updated review object
        serializer = ReviewSerializer(review)

        return Response(serializer.data)