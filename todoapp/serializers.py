from rest_framework.serializers import *
from .models import Project,ToDo,User


class ProjectModelSerializer(ModelSerializer):

   class Meta:
       model = Project
       fields = ('id','name','user',)


class ToDoModelSerializer(ModelSerializer):

    class Meta:
       model = ToDo
       fields = ('id','project','description','date_create','user_create','is_active')
