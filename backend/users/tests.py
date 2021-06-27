import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import UserModelViewSet
from .models import User


class TestUserModelViewSet(TestCase):
    # тест для API, используя APIRequestFactory.

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserModelViewSet.as_view({'get': 'list'})
        response = view(request)
        print(response.data['results'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # тест для API, используя APIClient
    def test_get_detail(self):
        user = User.objects.create(username='admin', birthday_year=18)
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # тест для API, используя mixer
    def test_get_detail_mixer(self):
        users = mixer.blend(User)
        response = self.client.get(f'/api/users/{users.id}/')
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


    # тест для API, используя APITestCase
class TestProjectModelViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
