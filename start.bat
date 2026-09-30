@echo off
echo ===================================================
echo Starting VishaTrace Full-Stack Application
echo ===================================================
echo.

start "VishaTrace Backend (Port 5000)" cmd /k "cd /d %~dp0server && npm run dev"
timeout /t 3 /nobreak > nul
start "VishaTrace Frontend (Port 5173)" cmd /k "cd /d %~dp0client && npm run dev"

echo Backend and Frontend launched!
echo Opening browser at http://localhost:5173 ...
timeout /t 2 /nobreak > nul
start http://localhost:5173
