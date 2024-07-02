from django.contrib import admin

from .models import disbursalRegistration
from .models import disbursalBT


# Register your models here.
admin.site.register(disbursalRegistration)
admin.site.register(disbursalBT)


