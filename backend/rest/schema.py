import graphene

from graphene_django import DjangoObjectType

from todoapp.models import Project, ToDo
from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_todos = graphene.List(ToDoType)
    user_by_id= graphene.Field(UserType,id=graphene.Int(required=True))


    def resolve_all_users(self,info):
        return User.objects.all()

    def resolve_all_projects(self,info):
        return Project.objects.all()

    def resolve_all_todos(self,info):
        return ToDo.objects.all()

    def resolve_user_by_id(self,info, id):
        return User.objects.get(id=id)


class UserUpdateMutation(graphene.Mutation):
    class Arguments:

        birthday_year= graphene.Int(required=True)
        id = graphene.ID()

    user=graphene.Field(UserType)
    @classmethod
    def mutate(cls,root,info,birthday_year ,id):
        user= User.objects.get(id=id)
        user.birthday_year= birthday_year
        user.save()
        return UserUpdateMutation(user=user)


class UserCreateMutation(graphene.Mutation):
    class Arguments:

        birthday_year= graphene.Int(required=True)
        username = graphene.String(required=True)
        email = graphene.String(required=True)


    user=graphene.Field(UserType)
    @classmethod
    def mutate(cls,root,info,birthday_year , username,email):
        user= User(username=username,email=email,birthday_year=birthday_year)
        user.birthday_year= birthday_year
        user.save()
        return UserCreateMutation(user=user)


class Mutation(graphene.ObjectType):
    update_user= UserUpdateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)