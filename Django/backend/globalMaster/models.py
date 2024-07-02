from django.db import models

class employee (models.Model):
    name                    = models.CharField(max_length=250)
    phone                   = models.CharField(max_length=250, null=True, blank=True)
    email                   = models.CharField(max_length=250, null=True, blank=True)
    address                 = models.CharField(max_length=250, null=True, blank=True)
    status                  = models.CharField(max_length=250, default='true')




    


    