@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

echo ============================================
echo   OPTIMIZADOR DE VIDEOS PARA WEB
echo   Procesa Design - Remodelacion
echo ============================================
echo.

REM Ruta de ffmpeg (ajusta esta ruta según tu instalación)
set "FFMPEG=C:\Users\PC Master\Desktop\ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe"

REM Verificar si ffmpeg existe
if not exist "%FFMPEG%" (
    echo ERROR: No se encuentra ffmpeg en la ruta especificada
    echo Ruta actual: %FFMPEG%
    echo.
    echo Por favor, ajusta la ruta de ffmpeg en el script
    pause
    exit /b 1
)

echo FFmpeg encontrado correctamente
echo.

REM Crear carpeta para videos originales (backup)
if not exist "original_backup" mkdir original_backup
if not exist "vintage\original_backup" mkdir vintage\original_backup

echo ============================================
echo Procesando videos principales...
echo ============================================
echo.

REM Contador de videos procesados
set /a count=0

REM Procesar videos en la carpeta principal
for %%f in (*.mp4 *.MP4) do (
    if not "%%f"=="optimized_%%f" (
        echo Procesando: %%f
        
        REM Copiar original a backup
        copy "%%f" "original_backup\%%f" >nul 2>&1
        
        REM Optimizar video
        "%FFMPEG%" -i "%%f" ^
            -c:v libx264 ^
            -preset slow ^
            -crf 28 ^
            -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" ^
            -c:a aac ^
            -b:a 128k ^
            -ar 44100 ^
            -movflags +faststart ^
            -y "temp_%%f" 2>nul
        
        if !errorlevel! equ 0 (
            del "%%f"
            ren "temp_%%f" "%%f"
            echo ✓ Optimizado exitosamente
            set /a count+=1
        ) else (
            echo ✗ Error al procesar
            if exist "temp_%%f" del "temp_%%f"
        )
        echo.
    )
)

echo.
echo ============================================
echo Procesando videos VINTAGE...
echo ============================================
echo.

REM Procesar videos en carpeta vintage
cd vintage
for %%f in (*.mp4 *.MP4) do (
    if not "%%f"=="optimized_%%f" (
        echo Procesando: vintage\%%f
        
        REM Copiar original a backup
        copy "%%f" "original_backup\%%f" >nul 2>&1
        
        REM Optimizar video
        "%FFMPEG%" -i "%%f" ^
            -c:v libx264 ^
            -preset slow ^
            -crf 28 ^
            -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" ^
            -c:a aac ^
            -b:a 128k ^
            -ar 44100 ^
            -movflags +faststart ^
            -y "temp_%%f" 2>nul
        
        if !errorlevel! equ 0 (
            del "%%f"
            ren "temp_%%f" "%%f"
            echo ✓ Optimizado exitosamente
            set /a count+=1
        ) else (
            echo ✗ Error al procesar
            if exist "temp_%%f" del "temp_%%f"
        )
        echo.
    )
)
cd ..

echo.
echo ============================================
echo PROCESO COMPLETADO
echo ============================================
echo.
echo Videos optimizados: %count%
echo.
echo NOTAS IMPORTANTES:
echo - Los videos originales están en la carpeta "original_backup"
echo - Los videos optimizados están optimizados para web
echo - Configuración aplicada:
echo   * Resolución máxima: 1920x1080 (Full HD)
echo   * Codec: H.264 (máxima compatibilidad)
echo   * CRF: 28 (equilibrio calidad/tamaño)
echo   * Audio: AAC 128kbps
echo   * Fast start: Habilitado (carga progresiva)
echo.
echo Si los videos originales ya no son necesarios,
echo puedes eliminar las carpetas "original_backup"
echo.
pause
