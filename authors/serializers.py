from rest_framework.serializers import *
from .models import Author


class AuthorModelSerializer(ModelSerializer):
   class Meta:
       model = Author
       fields = ('id','username', 'birthday_year', 'first_name', 'last_name',)