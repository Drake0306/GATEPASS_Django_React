"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

# from builderPayment import views as builderPaymentView
# from option import views as optionView
# from disbursal import views as disbursalView
from globalMaster import views as masterView
from authUser import views as auth
from gatePass import views as gatePass

urlpatterns = [
    path('admin/', admin.site.urls),

    # auth
    path('api/auth/login', auth.authCheckLogin, name="Login"),
    path('api/auth/userList', auth.authUserList, name="user list"),
    path('api/auth/userAdd', auth.authUserCreate, name="user Add"),
    path('api/auth/userUpdate/<int:id>', auth.authUserUpdate, name="user Add"),
    path('api/auth/userDelete/<int:id>', auth.authUserDelete, name="user Add"),

    
    path('api/gatePassEntry/listGatePssEntry/', gatePass.listGatePssEntry, name="Search"),
    path('api/gatePassEntry/searchExesting/', gatePass.searchExesting, name="Search"),
    path('api/gatePassEntry/searchByID/<int:id>', gatePass.searchByID, name="Search"),
    path('api/gatePassEntry/create/', gatePass.createGatePass, name="Add"),
    path('api/gatePassEntry/ledgerSearch/', gatePass.ledgerSearch, name="Add"),
    path('api/gatePassEntry/outEntry/', gatePass.outEntry, name="Add"),
    path('api/gatePassEntry/outEntryRemove/', gatePass.outEntryRemove, name="Add"),
    path('api/gatePassEntry/outEntry/delete/<int:id>', gatePass.deleteEntry, name="delete"),

    # # BuilderPayment
    # path('api/builderPayment/list', builderPaymentView.List, name="builder payment List"),
    # path('api/builderPayment/create', builderPaymentView.Create, name="builder payment Create"),
    # path('api/builderPayment/update/<int:id>', builderPaymentView.Update, name="builder payment Update"),
    # path('api/builderPayment/delete/<int:id>', builderPaymentView.Delete, name="builder payment Delete"),
    # path('api/builderPayment/paymentLedgerReport', builderPaymentView.paymentLedgerReport, name="builder payment Report"),
    # path('api/builderPayment/paymentExecutiveReport', builderPaymentView.paymentExecutiveReport, name="builder payment Executive Report"),
    
    # # Option
    # path('api/option/list', optionView.List, name="option List"),
    # path('api/option/create', optionView.Create, name="option Create"),
    # path('api/option/update/<int:id>', optionView.Update, name="option Update"),
    # path('api/option/delete/<int:id>', optionView.Delete, name="option Delete"),
    # path('api/option/bankWiseReport', optionView.BankWiseReport, name="option BankWiseReport"),
    # path('api/option/statusWiseReport', optionView.StatusWiseReport, name="option BankWiseReport"),

    # path('api/option/dudupe/', optionView.dudupeReport, name="option Report"),

    
    # # disbursal
    # path('api/disbursal/registration/list', disbursalView.disbursalRegistrationList, name="disbursal List"),
    # path('api/disbursal/registration/create', disbursalView.disbursalRegistrationCreate, name="disbursal Create"),
    # path('api/disbursal/registration/update/<int:id>', disbursalView.disbursalRegistrationUpdate, name="disbursal Update"),
    # path('api/disbursal/registration/delete/<int:id>', disbursalView.disbursalRegistrationDelete, name="disbursal Delete"),

    # path('api/disbursal/BT/list', disbursalView.disbursalBTList, name="disbursal List"),
    # path('api/disbursal/BT/create', disbursalView.disbursalBTCreate, name="disbursal Create"),
    # path('api/disbursal/BT/update/<int:id>', disbursalView.disbursalBTUpdate, name="disbursal Update"),
    # path('api/disbursal/BT/delete/<int:id>', disbursalView.disbursalBTDelete, name="disbursal Delete"),

    ### Master ###
    #employee
    path('api/master/employee/list', masterView.employeeList, name="Master Employee List"),
    path('api/master/employee/create', masterView.employeeCreate, name="Master Employee Create"),
    path('api/master/employee/update/<int:id>', masterView.employeeUpdate, name="Master Employee Update"),
    path('api/master/employee/delete/<int:id>', masterView.employeeDelete, name="Master Employee Delete"),
    
]
