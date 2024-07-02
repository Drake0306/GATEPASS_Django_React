from django.db import models

# Create your models here.
class user(models.Model):
    employeeID        = models.CharField(max_length=250,blank=True,null=True)
    name              = models.CharField(max_length=250,blank=True,null=True)
    email             = models.CharField(max_length=250,blank=True,null=True)
    password          = models.CharField(max_length=250,blank=True,null=True)
    phone             = models.CharField(max_length=250,blank=True,null=True)
    pic               = models.CharField(max_length=250,blank=True,null=True)
    org               = models.CharField(max_length=250,blank=True,null=True)
    branch            = models.CharField(max_length=250,blank=True,null=True)
    permission        = models.CharField(max_length=250,blank=True,null=True)
    status            = models.CharField(max_length=250, default='true')

class permission(models.Model):
    name              = models.CharField(max_length=250,blank=True,null=True)
    permissionSet     = models.CharField(max_length=350,blank=True,null=True)
    status            = models.CharField(max_length=250, default='true')






    


    