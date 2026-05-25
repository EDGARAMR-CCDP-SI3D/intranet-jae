@echo off
title JAE Intranet - Panel de Control
color 0F

:MENU
cls
echo.
echo  =======================================================
echo  *                                                     *
echo  *       JAE INTRANET  -  Panel de Control             *
echo  *                                                     *
echo  =======================================================
echo.
echo  Estado actual:
echo  -------------------------------------------------------

REM Check backend port 3000
netstat -ano | findstr ":3000" | findstr "LISTENING" >nul 2>&1
if %errorlevel%==0 (
    echo  [ ACTIVO ]  Base de Datos (Puerto 3000)
) else (
    echo  [APAGADO ]  Base de Datos (Puerto 3000)
)

REM Check frontend port 5173
netstat -ano | findstr ":5173" | findstr "LISTENING" >nul 2>&1
if %errorlevel%==0 (
    echo  [ ACTIVO ]  Servidor Vite (Puerto 5173)
) else (
    echo  [APAGADO ]  Servidor Vite (Puerto 5173)
)
echo  -------------------------------------------------------

REM Deteccion dinamica de IP de Tailscale
set TS_IP=100.99.152.24
for /f "usebackq tokens=*" %%i in (`tailscale ip -4 2^>nul`) do set TS_IP=%%i

echo  IP Tailscale detectada: %TS_IP%
echo.
echo  Enlaces de acceso:
echo   - Local (Esta PC):  http://localhost:5173
echo   - Movil (Tailscale): http://%TS_IP%:5173
echo.
echo  =======================================================
echo  [1] Iniciar Servidores (Base de Datos + Vite)
echo  [2] Detener Servidores (Mantenimiento)
echo  [3] Abrir Intranet en el Navegador Local
echo  [4] Recrear Acceso Directo en el Escritorio
echo  [5] Salir (Cerrar Panel de Control)
echo  =======================================================
echo.
set /p OPCION="Elige una opcion (1-5): "

if "%OPCION%"=="1" goto INICIAR
if "%OPCION%"=="2" goto DETENER
if "%OPCION%"=="3" goto ABRIR
if "%OPCION%"=="4" goto ACCESO
if "%OPCION%"=="5" goto FIN
goto MENU

:INICIAR
cls
echo.
echo  =======================================================
echo  Iniciando JAE Intranet...
echo  =======================================================
echo.

REM Verificar si ya esta corriendo en el puerto 3000 o 5173
netstat -ano | findstr ":3000" | findstr "LISTENING" >nul 2>&1
set BACKEND_RUNNING=%errorlevel%

netstat -ano | findstr ":5173" | findstr "LISTENING" >nul 2>&1
set FRONTEND_RUNNING=%errorlevel%

if %BACKEND_RUNNING%==0 (
    echo  [!] La Base de Datos ya esta activa en el puerto 3000.
) else (
    echo  [+] Iniciando Servidor API de Base de Datos...
    start "JAE - Servidor API Base de Datos" cmd /k "cd /d %~dp0web-app && node server.js"
)

if %FRONTEND_RUNNING%==0 (
    echo  [!] El Servidor Vite ya esta activo en el puerto 5173.
) else (
    echo  [+] Iniciando Servidor Vite de Frontend...
    start "JAE - Servidor Vite Frontend" cmd /k "cd /d %~dp0web-app && npm run dev"
)

echo.
echo  Servidores iniciados exitosamente.
echo  Esperando a que esten listos...
timeout /t 3 /nobreak >nul
goto MENU

:DETENER
cls
echo.
echo  =======================================================
echo  Deteniendo Servidores (Modo Mantenimiento)
echo  =======================================================
echo.

echo  [-] Buscando y deteniendo servidores...

REM Matar procesos por puerto 3000
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
    echo  Terminando proceso Base de Datos (PID: %%a)
    taskkill /PID %%a /F >nul 2>&1
)

REM Matar procesos por puerto 5173
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173" ^| findstr "LISTENING"') do (
    echo  Terminando proceso Frontend Vite (PID: %%a)
    taskkill /PID %%a /F >nul 2>&1
)

REM Cerrar ventanas por titulo
taskkill /FI "WINDOWTITLE eq JAE - Servidor API Base de Datos*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq JAE - Servidor Vite Frontend*" /F >nul 2>&1

echo.
echo  [+] Servidores detenidos. La Intranet esta ahora en Mantenimiento.
echo.
pause
goto MENU

:ABRIR
start http://localhost:5173
goto MENU

:ACCESO
cls
echo.
echo  =======================================================
echo  Recreando Acceso Directo en el Escritorio...
echo  =======================================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Crear_Acceso_Directo.ps1"
echo.
pause
goto MENU

:FIN
exit
