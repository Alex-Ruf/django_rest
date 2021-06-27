from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserModelSerializer, UserModelSerializerV2
from rest_framework.renderers import *
from rest_framework.views import *
from rest_framework.generics import ListAPIView, RetrieveAPIView,UpdateAPIView
from rest_framework.renderers import JSONRenderer
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework import mixins
from rest_framework import permissions



class UserModelViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, viewsets.GenericViewSet):
# class AuthorModelViewSet(ModelViewSet):

   queryset = User.objects.all()

   def get_serializer_class(self):
      if self.request.version == '2.0':
         return UserModelSerializerV2
      return UserModelSerializer
