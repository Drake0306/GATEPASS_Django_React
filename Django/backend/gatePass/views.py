from django.shortcuts import render
from django.db import connection
from django.db.models import Q
from functools import reduce



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
from .models import gatePass
from globalMaster.models import employee
from authUser.models import user
# Import Serialisers
from .serializers import gatePassSerializer
from globalMaster.serializers import employeeSerializer
from authUser.serializers import userSerializer

@api_view(['POST'])
def searchExesting(request):
    try:
        checkData = gatePass.objects.filter(mobile= request.data['idNo']).exists()
        if checkData == True:
            getData = gatePass.objects.filter(mobile= request.data['idNo']).order_by('id')
            DATA = gatePassSerializer(getData, many=True)
            return Response(DATA.data)

        else:
            return Response("CreateNew")
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )

@api_view(['GET'])
def searchByID(request, id):
    getData = gatePass.objects.get(id= id)
    permittedByName = ''
    personToMeet = ''

    if getData.permittedBy != '':
        employeeItem = employee.objects.filter(id= getData.permittedBy).first()
        employeeItemSerialise = employeeSerializer(employeeItem, many= False)
        permittedByName = employeeItemSerialise.data
    
    if getData.personToMeet != '':
        employeeItem = employee.objects.filter(id= getData.personToMeet).first()
        employeeItemSerialise = employeeSerializer(employeeItem, many= False)
        personToMeet = employeeItemSerialise.data

    DATA = gatePassSerializer(getData, many=False)
    seriliserData = DATA.data
    if personToMeet != '':
        seriliserData['personToMeet'] = personToMeet
    else:
        seriliserData['personToMeet'] = ''

    if permittedByName != '':
        seriliserData['permittedByName'] = permittedByName
    else:
        seriliserData['permittedByName'] = ''
        
    return Response(seriliserData)
    # try:
        
    # except Exception as e: 
    #     return Response(
    #         data={"message": "The Invite Key could not be created.","error": str(e)},
    #         status=status.HTTP_400_BAD_REQUEST
    #         )


@api_view(['GET'])
def listGatePssEntry(request):
    try:
        DataList = gatePass.objects.filter().order_by('id')
        LIST = gatePassSerializer(DataList, many= True)
        return Response(LIST.data)
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )


@api_view(['POST'])
def createGatePass(request):
    request.data.pop('id')
    # request.data.pop('picture')
    try:
        createData = gatePass()
        createData.cardNo                       = request.data.get('cardNo')
        createData.date                         = request.data.get('date')
        createData.name                         = request.data.get('name')
        createData.company                      = request.data.get('company')
        createData.address                      = request.data.get('address')
        createData.mobile                       = request.data.get('mobile')
        createData.vehicleNo                    = request.data.get('vehicleNo')
        createData.pourpose                     = request.data.get('pourpose')
        createData.noOfPerson                   = request.data.get('noOfPerson')
        createData.idNo                         = request.data.get('idNo')
        createData.typeOf                       = request.data.get('typeOf')
        createData.thumbPrint                   = request.data.get('thumbPrint')
        createData.personToMeet                 = request.data.get('personToMeet')
        createData.inTime                       = request.data.get('inTime')
        createData.allowingEntryinLicanceArea   = request.data.get('allowingEntryinLicanceArea')
        createData.outTime                      = request.data.get('outTime')
        createData.permittedBy                  = request.data.get('permittedBy')
        createData.carringGadget                = request.data.get('carringGadget')
        createData.passNo                       = request.data.get('passNo')
        createData.thumbImage                   = request.data.get('thumbImage')
        createData.picture                      = request.data.get('picture')
        createData.createdAt                    = request.data.get('createdAt')
        createData.updatedAt                    = request.data.get('updatedAt')
        createData.status                       = request.data.get('status')
        createData.save()

        return Response(createData.id)

        # checkData = gatePassSerializer(data= request.data, many=False)
        # if checkData.is_valid():
        #     checkData.save()
        # else:
        #     return Response(
        #         data={"message": "invalid Form Data","data": checkData.is_valid()},
        #         status=status.HTTP_400_BAD_REQUEST
        #     )
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )

@api_view(['POST'])
def outEntry(request):
    try:
        gatePassUPDATE = gatePass.objects.get(id= request.data['id'])
        gatePassUPDATE.outTime = request.data['outTime']
        gatePassUPDATE.save()
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )
    return Response('success')

@api_view(['GET'])
def deleteEntry(request, id):
    try:
        gatePassUPDATE = gatePass.objects.get(id= id).delete()
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )
    return Response('success')

@api_view(['POST'])
def outEntryRemove(request):
    try:
        gatePassUPDATE = gatePass.objects.get(id= request.data['id'])
        gatePassUPDATE.outTime = request.data['outTime']
        gatePassUPDATE.save()
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )
    return Response('success')

@api_view(['POST'])
def ledgerSearch(request):

    name = request.data.get('name', '')
    print(name)

    if name != '':
        ReportData = gatePass.objects.filter(
                Q(date__range= [request.data['from'], request.data['to']]) & Q(name__contains= name)
            )
    else:
        ReportData = gatePass.objects.filter(
                Q(date__range= [request.data['from'], request.data['to']])
            )

    List = gatePassSerializer(ReportData, many= True)
    for item in List.data:
        # user
        if item['permittedBy'] != '':
            permittedByItem = employee.objects.filter(id= item['permittedBy']).first()
            permittedByItemSerialise = employeeSerializer(permittedByItem, many= False)
            item['permittedByName'] = permittedByItemSerialise.data
        
        # user
        if item['personToMeet'] != '':
            personToMeetItem = employee.objects.filter(id= item['personToMeet']).first()
            personToMeetItemSerialise = employeeSerializer(personToMeetItem, many= False)
            item['personToMeetName'] = personToMeetItemSerialise.data

    return Response(List.data)