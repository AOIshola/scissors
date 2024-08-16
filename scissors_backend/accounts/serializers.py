from rest_framework import serializers
# from django.contrib.auth.models import User
from .models import User
from django.contrib.auth import authenticate
from rest_framework.serializers import ValidationError
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

class UserRegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(max_length=68, min_length=8, write_only=True)
    password2 = serializers.CharField(max_length=68, min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'password2']

    def validate(self, attrs):
        """method to validate data

        Args:
            attrs (dict): key value pair containing attributes to check and set
        """
        # to compare the two passwords provided by the user
        password = attrs.get('password', '')
        password2 = attrs.get('password2', '')
        if password != password2:
            raise serializers.ValidationError(detail={'password':"passwords does not match"})

        return super().validate(attrs)
    
    def create(self, validated_data):
        """create the serialized user

        Args:
            validated_data (dict): keyvalue pair data that has been validated
        """
        # we need to individually pass the data so as to omit the second password validation
        user = User.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password']
        )
        return user
    
class LoginSerializer(serializers.ModelSerializer):
    """serializes user login data

    Args:
        serializers (class): django rest_framework serializer class
    """
    email = serializers.EmailField(max_length=255, min_length=6)
    password = serializers.CharField(max_length=68, min_length=8, write_only=True)
    full_name = serializers.CharField(max_length=255, read_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)
    
    class Meta:
        model = User
        fields = ['email', 'password', 'full_name', 'access_token', 'refresh_token']
        
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request = self.context.get('request')
        user = authenticate(request, email=email, password=password)
        if not user:
            raise AuthenticationFailed("invalid credentials try again")
        if not user.is_verified:
            raise AuthenticationFailed("Email is not verified")
        user_token = user.tokens()
        return {
            'email': user.email, 
            'full_name': user.get_full_name,
            'access_token': str(user_token.get('access')),
            'refresh_token': str(user_token.get('refresh'))
        }
    

class LogoutUserSerializer(serializers.Serializer):
    refresh_token = serializers.CharField()
    
    # this is for the helper method
    default_error_messages = {
        'bad_token': ('Token is invalid or has expired')
    }
    
    def validate(self, attrs):
        refresh_token = attrs.get('refresh_token')
        try:
            RefreshToken.verify(refresh_token)
        except Exception as e:
            raise ValidationError(self.fields['refresh_token'].error_messages['bad_token'])
        return attrs
    
    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()  # blacklist the token, more like delete token
        except TokenError:
            return self.fail('bad_token')