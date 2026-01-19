# 🎬 Optimización de Videos para Web

## 📋 Descripción

Script para optimizar automáticamente todos los videos de remodelación usando **FFmpeg**, reduciendo su tamaño hasta un **70-80%** sin perder calidad visual perceptible.

## 🚀 Cómo Usar

### 1. Verificar FFmpeg
El script está configurado para usar:
```
C:\Users\PC Master\Desktop\ffmpeg-master-latest-win64-gpl\bin\ffmpeg.exe
```

Si tu FFmpeg está en otra ubicación, edita la línea 12 del archivo `optimize-videos.bat`:
```batch
set "FFMPEG=RUTA_A_TU_FFMPEG\ffmpeg.exe"
```

### 2. Ejecutar el Script
1. Haz doble clic en `optimize-videos.bat`
2. El script procesará automáticamente:
   - ✅ Todos los videos en `/remodelacion/`
   - ✅ Todos los videos en `/remodelacion/vintage/`

### 3. Esperar
- El proceso puede tomar varios minutos dependiendo del tamaño de los videos
- Verás el progreso en pantalla para cada video

## 🎯 Configuración de Optimización

### Parámetros Aplicados:

| Parámetro | Valor | Descripción |
|-----------|-------|-------------|
| **Codec Video** | H.264 (libx264) | Máxima compatibilidad web |
| **Preset** | slow | Mejor compresión (toma más tiempo) |
| **CRF** | 28 | Balance perfecto calidad/tamaño |
| **Resolución** | Máx 1920x1080 | Full HD (reduce si es mayor) |
| **Codec Audio** | AAC | Estándar web |
| **Bitrate Audio** | 128 kbps | Calidad óptima |
| **Fast Start** | ✅ Habilitado | Carga progresiva en web |

### Reducción de Tamaño Esperada:

| Tamaño Original | Tamaño Optimizado | Reducción |
|----------------|-------------------|-----------|
| 32 MB | ~8-10 MB | 70-75% |
| 7.8 MB | ~2-3 MB | 65-75% |
| 5.5 MB | ~1.5-2 MB | 70-80% |

## 🔒 Seguridad

- ✅ **Backup automático**: Los videos originales se guardan en `original_backup/`
- ✅ **No sobrescribe** hasta que la optimización termine exitosamente
- ✅ **Reversible**: Puedes restaurar los originales si es necesario

## 📁 Estructura Después de Ejecutar

```
remodelacion/
├── optimize-videos.bat          ← Script principal
├── original_backup/             ← Videos originales (BACKUP)
│   ├── video1.mp4
│   ├── video2.mp4
│   └── ...
├── video1.mp4                   ← Videos OPTIMIZADOS
├── video2.mp4
└── vintage/
    ├── original_backup/         ← Videos vintage originales
    │   └── ...
    └── video_vintage.mp4        ← Videos vintage OPTIMIZADOS
```

## ⚡ Beneficios de la Optimización

### Para el Sitio Web:
- ✅ **Carga más rápida**: Los videos pesan 70-80% menos
- ✅ **Mejor experiencia**: Los usuarios no esperan tanto
- ✅ **Menos ancho de banda**: Ahorro en hosting
- ✅ **SEO mejorado**: Google premia sitios rápidos

### Técnicos:
- ✅ **H.264**: Compatible con todos los navegadores
- ✅ **Fast Start**: El video empieza antes de descargar completo
- ✅ **Aspect Ratio**: Se mantiene la proporción original
- ✅ **Audio Optimizado**: Calidad suficiente, tamaño mínimo

## 🎨 Calidad Visual

- **CRF 28** es el punto óptimo para web:
  - CRF 0 = Sin pérdida (archivos gigantes)
  - CRF 23 = Alta calidad (tamaño medio)
  - **CRF 28 = Web óptimo (70-80% reducción)**
  - CRF 35 = Calidad media (muy comprimido)

## 🔧 Solución de Problemas

### Error: FFmpeg no encontrado
```
Solución: Edita la ruta en línea 12 del .bat
set "FFMPEG=C:\ruta\correcta\a\ffmpeg.exe"
```

### Video no se procesa
```
Solución: 
1. Verifica que el video no esté corrupto
2. Intenta reproducirlo primero
3. Revisa que no esté en uso por otro programa
```

### Proceso muy lento
```
Normal: preset "slow" da mejor compresión pero toma más tiempo
Para más rápido: Cambia "slow" por "medium" en línea 37
```

## 📊 Comparación Antes/Después

### Video Ejemplo: VINTAGE PROCESA KITCHEN_1.mp4

**ANTES:**
- Tamaño: 32 MB
- Bitrate: ~7000 kbps
- Tiempo de carga: 6-8 segundos

**DESPUÉS:**
- Tamaño: ~8 MB (75% reducción)
- Bitrate: ~2000 kbps
- Tiempo de carga: 1-2 segundos
- Calidad visual: ⭐⭐⭐⭐⭐ (imperceptible)

## ⚠️ Importante

1. **Primera vez**: El script crea backups automáticamente
2. **Segunda ejecución**: Saltará los videos ya optimizados
3. **Conserva backups**: Por si necesitas los originales
4. **Elimina backups**: Después de verificar que todo funciona bien

## 🎯 Resultado Final

Después de ejecutar el script, todos tus videos estarán:
- ✅ Optimizados para carga rápida
- ✅ Compatible con todos los navegadores
- ✅ Con carga progresiva (fast start)
- ✅ Listos para producción

## 💡 Tip Pro

Para verificar el tamaño reducido:
1. Clic derecho en el video → Propiedades
2. Compara el tamaño con el backup
3. Reproduce ambos para comparar calidad

---

**Procesa Design** - Sistema de Optimización de Medios 2026
