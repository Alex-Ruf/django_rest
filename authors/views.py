from rest_framework.viewsets import ModelViewSet
from .models import Author
from .serializers import AuthorModelSerializer
from rest_framework.renderers import *


class AuthorModelViewSet(ModelViewSet):
   renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

   queryset = Author.objects.all()
   serializer_class = AuthorModelSerializer