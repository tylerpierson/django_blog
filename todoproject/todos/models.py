from django.db import models

class Todo(models.Model):
    subject = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)