# Generated by Django 3.2.2 on 2021-05-19 17:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=64)),
                ('first_name', models.CharField(max_length=64)),
                ('last_name', models.CharField(max_length=64)),
                ('birthday_year', models.PositiveIntegerField()),
                ('email', models.EmailField(max_length=254, unique=True)),
            ],
        ),
    ]