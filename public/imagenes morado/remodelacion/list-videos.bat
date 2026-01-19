@echo off
echo Generando lista de videos de remodelacion...

(
echo // Videos de Remodelacion - Generado automaticamente
echo export const remodelacionVideos = [
for %%f in (*.mp4 *.MP4) do (
    echo   "/imagenes morado/remodelacion/%%f",
)
echo ];
echo.
echo // Videos Vintage
echo export const vintageVideos = [
cd vintage
for %%f in (*.mp4 *.MP4) do (
    echo   "/imagenes morado/remodelacion/vintage/%%f",
)
cd ..
echo ];
) > videosManifest.js

echo.
echo Archivo videosManifest.js generado exitosamente!
pause
