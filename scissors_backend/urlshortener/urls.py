from django.urls import path
from .views import UrlShortenerView, RedirectUrl, UserUrlsView


urlpatterns = [
    path('api/shorten/', UrlShortenerView.as_view(), name='shorten-url'),
    path('<str:url_code>/', RedirectUrl.as_view(), name='redirect-url'),
    path('user/urls/', UserUrlsView.as_view(), name='user-urls'),
]