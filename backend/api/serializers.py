from rest_framework import serializers

class RandomRBGSerializer(serializers.Serializer):
        random_numbers = serializers.ListField(
        child=serializers.IntegerField()
    )