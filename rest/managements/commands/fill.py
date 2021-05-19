import json
import os

from django.conf import settings


def load_from_json(file_name):
    with open(os.path.join(settings.BASE_DIR, f'rest/json/')) as f:
        return json.load(f)