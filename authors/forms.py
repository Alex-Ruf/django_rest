from django.contrib.auth.forms import AuthenticationForm

from authors.models import Author


class UserLoginForm(AuthenticationForm):
   class Meta:
      model = Author
      fields = ('username','password')