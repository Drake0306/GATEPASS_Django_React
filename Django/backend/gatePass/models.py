from django.db import models
from django_base64field.fields import Base64Field

# Create your models here.
class gatePass(models.Model):
    cardNo                       = models.CharField(max_length=250,blank=False,null=False)
    date                         = models.DateField(null=True, blank=True)
    name                         = models.CharField(max_length=250,blank=True, null=True)
    company                      = models.CharField(max_length=250,blank=True, null=True)
    address                      = models.CharField(max_length=250,blank=True,null=True)
    mobile                       = models.CharField(max_length=250,blank=True, null=True)
    vehicleNo                    = models.CharField(max_length=250,blank=True, null=True)
    pourpose                     = models.CharField(max_length=250,blank=True,null=True)
    noOfPerson                   = models.CharField(max_length=250,blank=True,null=True)
    idNo                         = models.CharField(max_length=250,blank=True,null=True)
    typeOf                       = models.CharField(max_length=250,blank=True,null=True)
    thumbPrint                   = models.TextField(blank=True,null=True)
    personToMeet                 = models.CharField(max_length=250,blank=True,null=True)
    inTime                       = models.CharField(max_length=250,blank=True,null=True)
    allowingEntryinLicanceArea   = models.CharField(max_length=250,blank=True,null=True)
    outTime                      = models.CharField(max_length=250,blank=True,null=True)
    permittedBy                  = models.CharField(max_length=250,blank=True,null=True)
    carringGadget                = models.CharField(max_length=250,blank=True,null=True)
    passNo                       = models.CharField(max_length=250,blank=True,null=True)
    thumbImage                   = Base64Field(max_length=900000, blank=True, null=True)
    picture                      = Base64Field(max_length=900000, blank=True, null=True)
    createdAt                    = models.DateField(null=True, blank=True)
    updatedAt                    = models.DateField(null=True, blank=True)
    status                       = models.CharField(max_length=250, default='true')




    


    