@echo off
REM Development startup script for 101 Dress

echo Starting 101 Dress Development Environment...
echo.

REM Start Backend
echo [1/2] Starting Backend Server...
cd backend
start cmd /k "python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && python -m backend.main"

REM Wait a bit for backend to start
timeout /t 3 /nobreak > nul

REM Start Frontend
echo [2/2] Starting Frontend Server...
cd ..\frontend
start cmd /k "npm install && npm run dev"

echo.
echo Development servers starting...
echo Backend: http://localhost:8001
echo Frontend: http://localhost:5173
echo API Docs: http://localhost:8001/docs
pause
