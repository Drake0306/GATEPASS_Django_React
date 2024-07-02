from django.contrib import admin

from .models import permission
from .models import user


# Register your models here.
admin.site.register(permission)
admin.site.register(user)


