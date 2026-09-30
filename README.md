# Bartolozzi Clínica Odontológica — propuesta

Landing estática en español (HTML, CSS y JavaScript, sin dependencias ni build): hero con muela de cristal animada, tratamientos, ubicación con mapa, cobertura, pasos, preguntas frecuentes, reseñas en Google, formulario y asistente de turnos por WhatsApp, y animación de scroll (un cepillo limpia el diente). Basada en la propuesta hecha para Kder Odontología.

## Vista local

```sh
python3 -m http.server 8000 --directory dist
```

Abrir http://localhost:8000. El mapa requiere conexión a Internet.

## Publicar

Sitio estático: Build Command vacío, Output Directory **dist** (`vercel.json` ya lo define). Para un sitio comercial, usar un servicio cuyo plan gratuito permita uso comercial (por ejemplo Cloudflare Pages o Netlify; verificar términos vigentes) o un plan pago.

## Archivos

- `dist/index.html`: contenido y estructura.
- `dist/style.css`: estilos; paletas al inicio (`html[data-palette=…]`).
- `dist/app.js`: número de WhatsApp (`PHONE`), mapa, consulta de obra social, formulario y selectores de paleta y tipografía.
- `dist/journey.js`, `dist/motion.js`: animaciones de scroll.
- `dist/bot.js`: asistente de turnos; preguntas en `BOT_CONFIG.steps`.
- `dist/fonts/`: tipografías propias (licencia SIL OFL). Al elegir la definitiva, quitar los selectores y las fuentes que no se usen.
- `dist/og-image.jpg`: vista previa del link. Las etiquetas `og:` apuntan a `https://bartolozzi-odontologia.vercel.app`; si el dominio es otro, actualizarlas.
- `material/Propuesta-Bartolozzi-Odontologia.pdf`: propuesta formal. Fuente en `material/propuesta/propuesta.html` (exportar a PDF desde el navegador: sin márgenes, con gráficos de fondo).

## Datos a confirmar con la clínica

Tomados de fuentes públicas (Google Maps, Facebook, Doctoralia):

- Dirección: 3 de Febrero 1080, Rosario. Coordenadas del perfil de Google Maps.
- “Más de 60 años creando sonrisas” (Facebook de la clínica).
- Tratamientos: implantes, estética dental, rehabilitación oral, odontología general y odontopediatría.
- Cobertura: Swiss Medical (según Doctoralia); resto de obras sociales a confirmar.
- **WhatsApp: pendiente.** Todos los botones usan `5493410000000` como marcador; reemplazarlo en `index.html`, `app.js` y `bot.js`.
- Horarios, fotos y profesionales: pendientes.

Se mantiene `noindex` mientras sea una propuesta. Las ilustraciones son conceptuales.
