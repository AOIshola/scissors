from accounts.models import User
from django.db import models
from django.conf import settings


class Url(models.Model):
    """
        model to represent a url and its shortened version
        in the database
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        null=True,
        blank=True,
        default=None
    )
    long_url = models.URLField()
    short_url = models.CharField(max_length=50, unique=True)
    url_code = models.CharField(max_length=15, unique=True)
    date_shortened = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        """
            string representation of an instance of Url
        """
        return f"{self.short_url} points to {self.long_url}"