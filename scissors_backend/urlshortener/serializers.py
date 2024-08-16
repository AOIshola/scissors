from rest_framework import serializers
from .models import Url


class UrlSerializer(serializers.ModelSerializer):
    """
        Serializer for Url model
    """
    class Meta:
        """
            metadata for the serializer
        """
        model = Url
        fields = ['id', 'long_url', 'short_url', 'url_code', 'date_shortened', 'user']