from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UserRegisterSerializer, LoginSerializer, LogoutUserSerializer
from rest_framework.permissions import AllowAny

class RegisterUserView(APIView):
    """the config for the register endpoint for our api

    Args:
        GenericAPIView (clas): generic api from rest_framework
    """
    serializer_class = UserRegisterSerializer
    
    # define a post method
    def post(self, request):
        """a post request to be processed for the register endpoint
        sends an email to the user after registeration

        Args:
            request (method): request method to fetch data
        """
        user_data = request.data
        serializer = self.serializer_class(data=user_data)
        # check if serialized data from user data is valid
        if serializer.is_valid(raise_exception=True):
            # if valid save the data
            serializer.save()
            user = serializer.data
            
            return Response(user, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginUserView(APIView):
    """handles login endpoint

    Args:
        GenericAPIView (class): generic apiview
    """
    serializer_class = LoginSerializer
    
    def post(self, request):
        """sends a post request and process user's login

        Args:
            request (method): sends a post request
        """
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class LogoutUserView(APIView):
    serializer_class = LogoutUserSerializer
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'success': 'You have been logged out successfully'}, status=status.HTTP_200_OK)