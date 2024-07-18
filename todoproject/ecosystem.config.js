module.exports = 
{
  "apps": [{
    "name": "DjangoTodoBackend",
    "script": "manage.py",
    "args": "runserver 0.0.0.0:8000",
    "interpreter": "/home/ubuntu/aws-apps/django_blog/todoproject/venv/bin/python",
    "cwd": "/home/ubuntu/aws-apps/django_blog/todoproject",
    "autorestart": true,
    "watch": false
  }]
}
