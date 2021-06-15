from rest_framework.serializers import *

from users.serializers import UserModelSerializer
from .models import Project,ToDo,User


class ProjectModelSerializerBase(ModelSerializer):

   class Meta:
       model = Project
       fields = ('id','name','user',)


class ProjectModelSerializer(ModelSerializer):
    user= UserModelSerializer()
    class Meta:
       model = Project
       fields = ('id','name','user',)


class ToDoModelSerializer(ModelSerializer):

    class Meta:
       model = ToDo
       fields = ('id','project','description','date_create','user_create','is_active')
