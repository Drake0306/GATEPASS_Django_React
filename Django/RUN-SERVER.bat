@echo off

CALL env\Scripts\activate.bat
cd backend/ 
py manage.py runserver
pause

