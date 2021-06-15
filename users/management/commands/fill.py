import json
import os

from django.conf import settings
from django.core.management import BaseCommand

from users.models import User


def load_from_json(file_name):
    with open(os.path.join(settings.BASE_DIR, f'authors/json/{file_name}')) as f:
        return json.load(f)

class Command(BaseCommand):
    def handle(self, *args, **options):
        users = load_from_json('user.json')

        User.objects.all().delete()
        for user in users:

            User.objects.create_superuser(**user)