from rest_framework.viewsets import ModelViewSet
from rest_framework.renderers import JSONRenderer,BrowsableAPIRenderer
from .models import Project,ToDo

from .serializers import ProjectModelSerializer,ToDoModelSerializer


class ProjectModelViewSet(ModelViewSet):
   renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

   queryset = Project.objects.all()
   serializer_class = ProjectModelSerializer


class ToDoModelViewSet(ModelViewSet):
   renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
   queryset = ToDo.objects.all()
   serializer_class = ToDoModelSerializer