from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, ToDo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ('name', 'work_user',)


class ToDoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ToDo
        fields = ('project', 'description', 'date_create', 'user_create', 'is_active','date_update',)
