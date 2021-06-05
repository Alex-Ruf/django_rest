from django.db import models

from authors.models import Author
class Project(models.Model):

    name =models.CharField(max_length=128, unique=True,verbose_name='имя проекта')
    work_user = models.ForeignKey(Author, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.name}'

    
    
class ToDo(models.Model):

    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    description = models.TextField(verbose_name='описание', blank=True)
    date_create = models.DateTimeField()
    date_update = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    user_create = models.ForeignKey(Author, on_delete=models.CASCADE)
    is_active = models.BooleanField(verbose_name="активность", default=True)

    def __str__(self):
        return f'{self.project}'
    
    
    
    
    
