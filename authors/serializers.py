from rest_framework.serializers import *
from .models import Author


class AuthorModelSerializer(ModelSerializer):
   class Meta:
       model = Author
       fields = ('username', 'birthday_year', 'first_name', 'last_name',)