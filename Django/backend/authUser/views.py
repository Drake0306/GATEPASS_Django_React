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
from .models import user
from .models import permission
from globalMaster.models import employee

# Import Serialisers
from .serializers import userSerializer
from .serializers import permissionSerializer
from globalMaster.serializers import employeeSerializer

@api_view(['POST'])
def authCheckLogin(request):
    LIST = []
    try:
        DataList = user.objects.filter(name= request.data['name'], password= request.data['password'], status= 'true').exists()
        if DataList == True:
            USERDATA = user.objects.filter(name= request.data['name'], password= request.data['password']).first()
            USERPERMISSION = permission.objects.filter(name= USERDATA.permission).first()

            LIST = {
                'user': {
                    'name': USERDATA.name,
                    'email': USERDATA.email,
                    'phone': USERDATA.phone,
                    'pic': USERDATA.pic,
                    'org': USERDATA.org,
                    'branch': USERDATA.branch,
                    'permission': USERDATA.permission,
                }
                ,
                'permission':{
                    'name': USERPERMISSION.name,
                    'permissionSet': USERPERMISSION.permissionSet,
                }
            }
            print(LIST)

        else: 
            return Response('User Cannot Be Found')
    except Exception as e: 
        return Response(
            data={"message": "The Invite Key could not be created.","error": str(e)},
            status=status.HTTP_400_BAD_REQUEST
            )
    return Response(LIST)

@api_view(['GET'])
def authUserList(request):
    DataList = user.objects.filter().order_by('-id')
    LIST = userSerializer(DataList, many= True)

    for item in LIST.data:
        # user
        if item['employeeID'] is not "":
            employeeItem = employee.objects.filter(id= item['employeeID']).first()
            employeeItemSerialise = employeeSerializer(employeeItem, many= False)
            item['employeeName'] = employeeItemSerialise.data
    return Response(LIST.data)


@api_view(['POST'])
def authUserCreate(request):
    try:
        checkData = userSerializer(data= request.data, many=False)
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
def authUserUpdate(request,id):
    userUPDATE = user.objects.get(id= id)
    checkData = userSerializer(userUPDATE, data= request.data, partial=True)
    if checkData.is_valid():
            checkData.save()
    else:
        return Response(
            data={"message": "invalid Form Data","data": checkData.is_valid()},
            status=status.HTTP_400_BAD_REQUEST
        )
    return Response('success')

@api_view(['GET'])
def authUserDelete(request,id):
    user.objects.filter(id=id).delete()
    return Response('success')



