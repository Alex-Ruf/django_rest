from django.contrib.auth.models import AbstractUser

from django.db import models


class Author(models.Model):

   username= models.CharField(max_length=128,verbose_name='имя пользователя')
   last_name= models.CharField(max_length=128,verbose_name='фамилия пользователя')
   birthday_year = models.PositiveIntegerField()
   email = models.EmailField(unique=True)

   def __str__(self):
      return f'{self.username}{self.email}{self.birthday_year}'
