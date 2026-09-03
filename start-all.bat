@echo off
echo Starting NagarFlow AI Full-Stack Platform...
start "NagarFlow AI Backend" cmd /c "cd backend && pip install -r requirements.txt && python run.py"
start "NagarFlow AI Frontend" cmd /c "cd frontend && npm install --legacy-peer-deps && npm run dev"
echo.
echo Both servers launching! 
echo Backend API: http://localhost:8000
echo Frontend Command Center: http://localhost:3000
pause
