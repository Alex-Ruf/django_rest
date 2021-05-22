from django.contrib.auth.models import AbstractUser
from django.db import models


class Author(AbstractUser):


   birthday_year = models.PositiveIntegerField()
   email = models.EmailField(unique=True)

   def __str__(self):
      return f'{self.username}{self.email}'
