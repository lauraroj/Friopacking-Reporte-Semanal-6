# Reporte Semanal 6 — Laura Rojas · FrioPacking (versión visual)

Versión ejecutiva y visual del Reporte Semanal 6, en la misma familia que el Reporte Semanal 4: tarjetas, cifras, acordeones por día y mucho menos texto visible de entrada.

Construida solo con **HTML, CSS y JavaScript básico** (los acordeones de cada día usan `<details>/<summary>` nativos, sin necesidad de JavaScript adicional para abrir o cerrar). Funciona igual abriendo `index.html` directamente o publicada en GitHub Pages.

## Estructura de archivos

```
reporte-semanal-6/
│
├── index.html
├── styles.css
├── script.js
├── README.md
│
└── assets/
    └── images/
        ├── portada-proyecto-trujillo.jpg
        ├── instalacion-interior-altura.jpg
        ├── tuberias-valvulas-atico.jpg
        ├── avance-obra-interior.jpg
        ├── visita-obra-epp.jpg
        ├── plc-tablero-electrico.jpg
        ├── ambiente-paneles-frigorificos.jpg
        ├── puerta-frigorifica.jpg
        └── laura-rojas.jpg   ← opcional, ver "Sección Sobre mí" abajo
```

## Qué cambió respecto a la versión anterior

- **Mucho menos texto visible de entrada.** Cada día de la semana ahora es una tarjeta con introducción corta siempre visible; el detalle (actividades, aprendizajes, reflexión, fotos) está dentro de un acordeón que se expande al hacer clic. **Lunes empieza abierto**, los demás días empiezan cerrados.
- **Nueva estructura tipo dashboard**, con las mismas secciones de tus reportes anteriores: Perfil, Trayectoria del practicum (pipeline de rotación), Resumen ejecutivo en cifras, Aprendizajes clave, Personas y equipos, Conexión con Boston University, Reflexión final y Próximos pasos.
- **Fila "Navegar entre reportes"** debajo de la portada, con un botón por cada semana (ver siguiente sección para activarlos).
- **Tipografía actualizada:** Inter para texto, navegación, botones y etiquetas; Sora para todos los títulos, encabezados de tarjeta y cifras destacadas — igual que el Reporte Semanal 4.
- Las ocho fotografías se mantienen exactamente igual (mismos nombres, mismos textos alternativos, cada una dentro de su día correspondiente, sin galería separada).

## Activar los enlaces a tus otros reportes

En `index.html`, dentro del bloque `<nav class="week-switch">`, cada botón de semana anterior tiene un comentario `<!-- TODO: ... -->` justo encima y un enlace provisional (`href="#semana-1"`, etc.). Reemplaza esos `href` por la URL pública real de cada reporte, por ejemplo:

```html
<!-- TODO: reemplazar por el enlace público de la Semana 1 -->
<a href="https://lauraroj.github.io/Friopacking-Reporte-Semanal-1/" class="week-pill">Semana 1</a>
```

El botón "Semana 6" no lleva enlace porque representa el reporte actual.

## Tipografía (Inter + Sora)

Se cargan ambas familias desde Google Fonts en el `<head>` de `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sora:wght@500;600;700&display=swap" rel="stylesheet">
```

Si Google Fonts no llega a cargar (por ejemplo, sin conexión), la página sigue siendo legible: las variables de `styles.css` incluyen `Arial` como respaldo:

```css
--font-body: 'Inter', Arial, sans-serif;
--font-heading: 'Sora', 'Inter', Arial, sans-serif;
```

## Sección "Sobre mí" y foto de perfil

Igual que antes: la foto busca `assets/images/laura-rojas.jpg`. Si el archivo no existe, se muestra automáticamente un respaldo circular con tus iniciales ("LR"), manejado por `script.js` (sección 7). Para activar tu foto real, copia tu headshot a `assets/images/laura-rojas.jpg` — no hace falta tocar el código.

## Cómo publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (público) — por ejemplo `reporte-semanal-6`.
2. Sube `index.html`, `styles.css`, `script.js`, `README.md` y la carpeta `assets/images/` completa (arrastrando la carpeta se conserva la estructura).
3. Ve a **Settings → Pages**, elige la rama **main** y la carpeta **/ (root)**, y guarda.
4. Espera uno o dos minutos: el enlace público aparecerá en la misma pantalla, con el formato `https://TU-USUARIO.github.io/reporte-semanal-6/`.

## Lista de verificación de imágenes

- [ ] `portada-proyecto-trujillo.jpg`
- [ ] `instalacion-interior-altura.jpg`
- [ ] `tuberias-valvulas-atico.jpg`
- [ ] `avance-obra-interior.jpg`
- [ ] `visita-obra-epp.jpg`
- [ ] `plc-tablero-electrico.jpg`
- [ ] `ambiente-paneles-frigorificos.jpg`
- [ ] `puerta-frigorifica.jpg`

## Editar el contenido más adelante

- **Textos y estructura:** todo está en `index.html`, con comentarios que marcan cada sección (portada, navegar entre reportes, perfil, trayectoria, resumen, cada día, aprendizajes, equipo, Boston University, reflexión final, próximos pasos).
- **Colores, tipografía y espaciado:** variables centralizadas al inicio de `styles.css`, en `:root { ... }`.
- **Comportamiento** (menú activo, barra de progreso, ampliar fotos, botón de imprimir, respaldo del avatar): todo en `script.js`, comentado por función.
- **Imprimir / guardar como PDF:** el botón "PDF" del menú, o `Ctrl/Cmd + P`. Los estilos de impresión (`@media print` en `styles.css`) muestran el contenido completo de todos los acordeones, aunque estén cerrados en pantalla, para que el PDF no pierda información.
