from rest_framework.serializers import *
from .models import User


class UserModelSerializer(ModelSerializer):
   class Meta:
       model = User
       fields = ('id','username', 'birthday_year',)