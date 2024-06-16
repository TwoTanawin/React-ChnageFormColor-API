from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
import random

class RandomRGBView(APIView):
    def get(self, request):
        random_numbers = [random.randint(1, 180) for _ in range(3)]  # Generate three random numbers between 1 and 100
        return Response({'random_numbers': random_numbers})
