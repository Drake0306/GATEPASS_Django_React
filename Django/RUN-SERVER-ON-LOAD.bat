@echo off
if not defined FOO (
  set FOO=1
  start /min "" %~0
  exit /b
)

CALL env\Scripts\activate.bat
cd backend/ 
py manage.py runserver


