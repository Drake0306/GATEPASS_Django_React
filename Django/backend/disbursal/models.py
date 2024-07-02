from django.db import models

# Create your models here.
class disbursalRegistration(models.Model):
    bankName              = models.CharField(max_length=250,blank=True,null=True)
    branchName            = models.CharField(max_length=250,blank=True,null=True)
    registrationDate      = models.CharField(max_length=250,blank=True, null=True)
    transNo               = models.CharField(max_length=250,blank=True, null=True)
    address               = models.CharField(max_length=250,blank=True,null=True)
    dsa                   = models.CharField(max_length=250,blank=True, null=True)
    phone                 = models.CharField(max_length=250,blank=True, null=True)
    seller                = models.CharField(max_length=250,blank=True,null=True)
    registrarOff          = models.CharField(max_length=250,blank=True,null=True)
    purchaser             = models.CharField(max_length=250,blank=True,null=True)
    reciptNo              = models.CharField(max_length=250,blank=True,null=True)
    rdSentOn              = models.CharField(max_length=250,blank=True,null=True)
    sdSentOn              = models.CharField(max_length=250,blank=True,null=True)
    tdSentOn              = models.CharField(max_length=250,blank=True,null=True)
    sentAt                = models.CharField(max_length=250,blank=True,null=True)
    caseClosed            = models.CharField(max_length=250,blank=True,null=True)
    courierDate           = models.CharField(max_length=250,blank=True,null=True)
    propertyDetails       = models.CharField(max_length=250,blank=True,null=True)
    deedWriterAdv         = models.CharField(max_length=250,blank=True,null=True)
    handledBy             = models.CharField(max_length=250,blank=True,null=True)
    applicationNo         = models.CharField(max_length=250,blank=True,null=True)
    pageNo                = models.CharField(max_length=250,blank=True,null=True)
    remarks               = models.CharField(max_length=250,blank=True,null=True)
    otherRemarkIfAny      = models.CharField(max_length=250,blank=True,null=True)
    checqueDate           = models.CharField(max_length=250,blank=True,null=True)
    amount                = models.CharField(max_length=250,blank=True,null=True)
    chequeRecivedDate     = models.CharField(max_length=250,blank=True,null=True)
    chequeReturnDate      = models.CharField(max_length=250,blank=True,null=True)
    status                = models.CharField(max_length=250, default='true')

class disbursalBT(models.Model):
    bankName              = models.CharField(max_length=250,blank=True,null=True)
    branchName            = models.CharField(max_length=250,blank=True,null=True)
    date                  = models.CharField(max_length=250,blank=True, null=True)
    transNo               = models.CharField(max_length=250,blank=True, null=True)
    customerName          = models.CharField(max_length=250,blank=True,null=True)
    phoneNo               = models.CharField(max_length=250,blank=True, null=True)
    address               = models.CharField(max_length=250,blank=True, null=True)
    collectionDate        = models.CharField(max_length=250,blank=True,null=True)
    docSentToBankDate     = models.CharField(max_length=250,blank=True,null=True)
    sentAt                = models.CharField(max_length=250,blank=True,null=True)
    caseClose             = models.CharField(max_length=250,blank=True,null=True)
    loanTakenFrom         = models.CharField(max_length=250,blank=True,null=True)
    propertyDetails       = models.CharField(max_length=250,blank=True,null=True)
    handledBy             = models.CharField(max_length=250,blank=True,null=True)
    applicationNo         = models.CharField(max_length=250,blank=True,null=True)
    remarks               = models.CharField(max_length=250,blank=True,null=True)
    otherRemarkIfAny      = models.CharField(max_length=250,blank=True,null=True)
    chequeDate            = models.CharField(max_length=250,blank=True,null=True)
    amount                = models.CharField(max_length=250,blank=True,null=True)
    chequeReceivedDate    = models.CharField(max_length=250,blank=True,null=True)
    chequeReturnDate      = models.CharField(max_length=250,blank=True,null=True)
    status                = models.CharField(max_length=250, default='true')




    


    