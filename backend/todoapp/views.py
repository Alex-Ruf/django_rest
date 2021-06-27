from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer,BrowsableAPIRenderer
from .models import Project,ToDo
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from .serializers import ProjectModelSerializer, ToDoModelSerializer, ProjectModelSerializerBase
from rest_framework.pagination import LimitOffsetPagination
from django_filters import rest_framework as filters
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class ProjectLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 10
class ToDoLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 20



class ProjectModelViewSet(ModelViewSet):
   renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
   queryset = Project.objects.all()
   permission_classes = [permissions.IsAuthenticated]
   serializer_class = ProjectModelSerializer
   pagination_class = ProjectLimitOffsetPagination
   filterset_fields = ['name','user']

   def get_serializer_class(self):
      if self.request.method in ['GET']:
         return ProjectModelSerializer
      return ProjectModelSerializerBase



class ToDoModelViewSet(ModelViewSet):
   renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
   permission_classes = [permissions.IsAuthenticated]
   queryset = ToDo.objects.all()
   serializer_class = ToDoModelSerializer
   pagination_class = ProjectLimitOffsetPagination
   filterset_fields = ['id','project','description','date_create','user_create','is_active']

   def destroy(self, request, *args, **kwargs):
      project = self.get_object()
      project.is_active = False
      project.save()
      serializer = ToDoModelSerializer(project)
      return Response(serializer.data)
