from django.db import models

# Create your models here.
class optionPrepareReport(models.Model):
    reciptDate              = models.CharField(max_length=250,blank=True,null=True)
    bankRefNo               = models.CharField(max_length=250,blank=True,null=True)
    bank                    = models.CharField(max_length=250,blank=True, null=True)
    branch                  = models.CharField(max_length=250,blank=True, null=True)
    apsNo                   = models.CharField(max_length=250,blank=True,null=True)
    report                  = models.CharField(max_length=250,blank=True, null=True)
    customerBorrower        = models.CharField(max_length=250,blank=True, null=True)
    repNo                   = models.CharField(max_length=250,blank=True,null=True)
    profCharges             = models.CharField(max_length=250,blank=True,null=True)
    inspectionReceipt       = models.CharField(max_length=250,blank=True,null=True)
    outOfPocketExp          = models.CharField(max_length=250,blank=True,null=True)
    flatHousePlotNo         = models.CharField(max_length=250,blank=True,null=True)
    roofRight               = models.CharField(max_length=250,blank=True,null=True)
    floor                   = models.CharField(max_length=250,blank=True,null=True)
    RepRefNo                = models.CharField(max_length=250,blank=True,null=True)
    streetSectorLocal       = models.CharField(max_length=250,blank=True,null=True)
    referBy                 = models.CharField(max_length=250,blank=True,null=True)
    city                    = models.CharField(max_length=250,blank=True,null=True)
    reportDate              = models.CharField(max_length=250,blank=True,null=True)
    phoneNo                 = models.CharField(max_length=250,blank=True,null=True)
    reportSentThru          = models.CharField(max_length=250,blank=True,null=True)
    email                   = models.CharField(max_length=250,blank=True,null=True)
    reportSentOn            = models.CharField(max_length=250,blank=True,null=True)
    receivedBy              = models.CharField(max_length=250,blank=True,null=True)
    location                = models.CharField(max_length=250,blank=True,null=True)
    collectedBy             = models.CharField(max_length=250,blank=True,null=True)
    searchExp               = models.CharField(max_length=250,blank=True,null=True)
    preparedBy              = models.CharField(max_length=250,blank=True,null=True)
    nature                  = models.CharField(max_length=250,blank=True,null=True)
    statusValue             = models.CharField(max_length=250,blank=True,null=True)
    remarks                 = models.TextField(blank=True,null=True)
    fallowUp                = models.TextField(blank=True,null=True)
    fileUpload              = models.CharField(max_length=250,blank=True,null=True)
    status                  = models.CharField(max_length=250, default='true')




    


    