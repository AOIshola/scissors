from django.shortcuts import redirect, get_object_or_404
from django.utils.crypto import get_random_string
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UrlSerializer
from .models import Url



class UrlShortenerView(APIView):
    """
    API view for the URL shortener
    """
    def post(self, request):
        """
        Create a shortened URL for the long URL
        """
        long_url = request.data.get('long_url')
        custom_code = request.data.get('custom_code', '')

        existing_long_url = Url.objects.filter(long_url=long_url).first()
        if existing_long_url:
            serializer = UrlSerializer(existing_long_url)
            return Response(serializer.data, status=status.HTTP_200_OK)

        if custom_code:
            existing_custom_url = Url.objects.filter(url_code=custom_code).first()
            if existing_custom_url:
                serializer = UrlSerializer(existing_custom_url)
                return Response(serializer.data, status=status.HTTP_200_OK)
            url_code = custom_code
        else:
            url_code = get_random_string(8)

        # Check if the user is authenticated
        if request.user.is_authenticated:
            user = request.user
            print("Authenticated User:", user.id)
        else:
            user = None  # Set to None if the user is not authenticated

        data = {
            'long_url': long_url,
            'url_code': url_code,
            'short_url': f"http://localhost:8000/{url_code}",
            'user': user.id if user else None  # Link the user if authenticated
        }

        serializer = UrlSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

class RedirectUrl(APIView):
    """ Redirect short url to original long url
    """
    def get(self, request, url_code):
        """ get the long url mapped to the url code
        """
        url = get_object_or_404(Url, url_code=url_code)
        return redirect(url.long_url)


class UserUrlsView(APIView):
    """ Fetch the url data of an authenticated user
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """ get all url of a user
        """
        user = request.user
        print(user)
        urls = Url.objects.filter(user=user)
        serializer = UrlSerializer(urls, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
