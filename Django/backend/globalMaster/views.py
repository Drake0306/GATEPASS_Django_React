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
from .models import employee

# Import Serialisers
from .serializers import employeeSerializer


## employee

@api_view(['GET'])
def employeeList(request):
    DataList = employee.objects.filter().order_by('-id')
    LIST = employeeSerializer(DataList, many= True)
    return Response(LIST.data)

@api_view(['POST'])
def employeeCreate(request):
    try:
        checkData = employeeSerializer(data= request.data, many=False)
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
def employeeUpdate(request,id):
    employeeUPDATE = employee.objects.get(id= id)
    checkData = employeeSerializer(employeeUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')

@api_view(['GET'])
def employeeDelete(request,id):
    employee.objects.filter(id=id).delete()
    return Response('success')






