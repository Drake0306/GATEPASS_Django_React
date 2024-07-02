from django.shortcuts import render
from django.db import connection
from django.db.models import Q


# Create your views here.

# django rest import
from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime, timedelta, date

# import json
import json

# Import Model
from .models import optionPrepareReport
from globalMaster.models import bank
from globalMaster.models import branch
from authUser.models import user

# Import Serialisers
from .serializers import optionPrepareReportSerializer
from globalMaster.serializers import bankSerializer
from globalMaster.serializers import branchSerializer
from authUser.serializers import userSerializer

@api_view(['GET'])
def List(request):
    DataList = optionPrepareReport.objects.filter().order_by('-id')
    LIST = optionPrepareReportSerializer(DataList, many= True)
    for item in LIST.data:
        # Bank
        bankItem = bank.objects.filter(id= item['bank']).first()
        bankSerialise = bankSerializer(bankItem, many= False)
        item['bankName'] = bankSerialise.data
        # Branch 
        branchItem = branch.objects.filter(id= item['branch']).first()
        branchSerialise = branchSerializer(branchItem, many= False)
        item['branchName'] = branchSerialise.data
    return Response(LIST.data)

@api_view(['POST'])
def Create(request):
    try:
        checkData = optionPrepareReportSerializer(data= request.data, many=False)
        if checkData.is_valid():
            checkData.save()
        else:
            return Response(
                data={"message": "invalid Form Data","data": checkData.is_valid()},
                status=status.HTTP_400_BAD_REQUEST
            )
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )
    return Response('success')


@api_view(['POST'])
def Update(request,id):
    optionPrepareReportUPDATE = optionPrepareReport.objects.get(id= id)
    checkData = optionPrepareReportSerializer(optionPrepareReportUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')

@api_view(['POST'])
def dudupeReport(request):
    ReportData = optionPrepareReport.objects.filter(
            Q(flatHousePlotNo=request.data['flatHousePlotNo']) | Q(streetSectorLocal=request.data['streetSectorLocal'])
        )

    # if request.data['districtStatePin'] is not '':
    #     ReportData.filter(districtStatePin=request.data['districtStatePin'])

    List = optionPrepareReportSerializer(ReportData, many= True)
    for item in List.data:
        # Bank
        bankItem = bank.objects.filter(id= item['bank']).first()
        bankSerialise = bankSerializer(bankItem, many= False)
        item['bankName'] = bankSerialise.data

    return Response(List.data)


@api_view(['GET'])
def Delete(request,id):
    optionPrepareReport.objects.filter(id=id).delete()
    return Response('success')


@api_view(['POST'])
def BankWiseReport(request): 
    ReportData = optionPrepareReport.objects.filter(
                Q(reciptDate__range= [request.data['from'], request.data['to']]) & Q(bank= request.data['bank']) & Q(branch= request.data['branch'])
            )     
    if request.data['caseRecived'] is not False:
        ReportData = optionPrepareReport.objects.filter(
            Q(reciptDate__range= [request.data['from'], request.data['to']]) & Q(bank= request.data['bank']) & Q(branch= request.data['branch'])
        )

    if request.data['caseSent'] is not False:
        ReportData = optionPrepareReport.objects.filter(
            Q(reciptDate__range= [request.data['from'], request.data['to']]) & Q(bank= request.data['bank']) & Q(branch= request.data['branch'])
        )
    
    if request.data['casePending'] is not False:
        ReportData = optionPrepareReport.objects.filter(
            Q(reciptDate__range= [request.data['from'], request.data['to']]) & Q(bank= request.data['bank']) & Q(branch= request.data['branch']) & Q(statusValue= "Pending")
        )
    
    if request.data['caseHold'] is not False:
        ReportData = optionPrepareReport.objects.filter(
            Q(reciptDate__range= [request.data['from'], request.data['to']]) & Q(bank= request.data['bank']) & Q(branch= request.data['branch']) & Q(statusValue= "Hold")
        )

    List = optionPrepareReportSerializer(ReportData, many= True)
    for item in List.data:
         # Bank
        bankItem = bank.objects.filter(id= item['bank']).first()
        bankSerialise = bankSerializer(bankItem, many= False)
        item['bankName'] = bankSerialise.data
        # Branch 
        branchItem = branch.objects.filter(id= item['branch']).first()
        branchSerialise = branchSerializer(branchItem, many= False)
        item['branchName'] = branchSerialise.data
        # User 
        userItem = user.objects.filter(id= item['preparedBy']).first()
        userSerialise = userSerializer(userItem, many= False)
        item['preparedByName'] = userSerialise.data
        
    return Response(List.data)


@api_view(['POST'])
def StatusWiseReport(request): 
    ReportData = optionPrepareReport.objects.filter(
                Q(bank= request.data['bank']) & Q(branch= request.data['branch']) & Q(statusValue= request.data['branch'])
            )     
    if request.data['caseRecived'] is not False:
        ReportData = optionPrepareReport.objects.filter(
            Q(reciptDate__range= [request.data['from'], request.data['to']]) & Q(bank= request.data['bank']) & Q(branch= request.data['branch'])
        )

    if request.data['caseSent'] is not False:
        ReportData = optionPrepareReport.objects.filter(
            Q(reciptDate__range= [request.data['from'], request.data['to']]) & Q(bank= request.data['bank']) & Q(branch= request.data['branch'])
        )
    
    if request.data['casePending'] is not False:
        ReportData = optionPrepareReport.objects.filter(
            Q(reciptDate__range= [request.data['from'], request.data['to']]) & Q(bank= request.data['bank']) & Q(branch= request.data['branch']) & Q(statusValue= "Pending")
        )
    
    if request.data['caseHold'] is not False:
        ReportData = optionPrepareReport.objects.filter(
            Q(reciptDate__range= [request.data['from'], request.data['to']]) & Q(bank= request.data['bank']) & Q(branch= request.data['branch']) & Q(statusValue= "Hold")
        )

    List = optionPrepareReportSerializer(ReportData, many= True)
    for item in List.data:
         # Bank
        bankItem = bank.objects.filter(id= item['bank']).first()
        bankSerialise = bankSerializer(bankItem, many= False)
        item['bankName'] = bankSerialise.data
        # Branch 
        branchItem = branch.objects.filter(id= item['branch']).first()
        branchSerialise = branchSerializer(branchItem, many= False)
        item['branchName'] = branchSerialise.data
        # User 
        userItem = user.objects.filter(id= item['preparedBy']).first()
        userSerialise = userSerializer(userItem, many= False)
        item['preparedByName'] = userSerialise.data
        
    return Response(List.data)


