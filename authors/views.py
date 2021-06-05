from rest_framework.viewsets import ModelViewSet
from .models import Author
from .serializers import AuthorModelSerializer
from rest_framework.renderers import *
from rest_framework.views import *
from rest_framework.generics import ListAPIView, RetrieveAPIView,UpdateAPIView
from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework import mixins



class AuthorModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):

   queryset = Author.objects.all()
   serializer_class = AuthorModelSerializer

