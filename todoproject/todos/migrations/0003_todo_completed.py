# Generated by Django 5.0.7 on 2024-07-17 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todos', '0002_remove_todo_details'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='completed',
            field=models.BooleanField(default=False),
        ),
    ]