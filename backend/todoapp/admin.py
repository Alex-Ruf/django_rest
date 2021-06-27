from django.contrib import admin

from todoapp.models import Project, ToDo

admin.site.register(ToDo )
admin.site.register(Project)
