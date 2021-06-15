from django.contrib.auth.models import AbstractUser

from django.db import models


class User(AbstractUser):

   birthday_year = models.PositiveIntegerField(default=18)
   email = models.EmailField(unique=True)



