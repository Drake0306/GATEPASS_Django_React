from django.shortcuts import render
from django.db import connection


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
from .models import disbursalRegistration
from .models import disbursalBT

# Import Serialisers
from .serializers import disbursalRegistrationSerializer
from .serializers import disbursalBTSerializer

@api_view(['GET'])
def disbursalRegistrationList(request):
    DataList = disbursalRegistration.objects.filter().order_by('-id')
    LIST = disbursalRegistrationSerializer(DataList, many= True)
    return Response(LIST.data)

@api_view(['POST'])
def disbursalRegistrationCreate(request):
    try:
        checkData = disbursalRegistrationSerializer(data= request.data, many=False)
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
def disbursalRegistrationUpdate(request,id):
    disbursalRegistrationUPDATE = disbursalRegistration.objects.get(id= id)
    checkData = disbursalRegistrationSerializer(disbursalRegistrationUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')

@api_view(['GET'])
def disbursalRegistrationDelete(request,id):
    disbursalRegistration.objects.filter(id=id).delete()
    return Response('success')


@api_view(['GET'])
def disbursalBTList(request):
    DataList = disbursalBT.objects.filter().order_by('-id')
    LIST = disbursalBTSerializer(DataList, many= True)
    return Response(LIST.data)

@api_view(['POST'])
def disbursalBTCreate(request):
    try:
        checkData = disbursalBTSerializer(data= request.data, many=False)
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
def disbursalBTUpdate(request,id):
    disbursalBTUPDATE = disbursalBT.objects.get(id= id)
    checkData = disbursalBTSerializer(disbursalBTUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')

@api_view(['GET'])
def disbursalBTDelete(request,id):
    disbursalBT.objects.filter(id=id).delete()
    return Response('success')


