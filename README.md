# Ultramadness - Plataforma Web para Música a Oscuras

## 📋 Preguntas para Sebastián

### Contenido y Funcionalidades

- [x] ¿Queres incluir una sección de blog en el sitio? - Si incluir blog, asi que hay que hacer mas adelante la vista del blog
- [ ] ¿Cuántos eventos sueles tener activos al mismo tiempo?
- [x] ¿Queres que los testimonios sean solo de texto o queres que tambien haya videos de testimonios? - Tabs con texto y videos

### Diseño y Branding

- [x] ¿Tienes fotos profesionales de los eventos anteriores o quieres que primero pruebe con imagenes de prueba? - Usar imagenes de prueba propias y despues las cambia

### Integraciones

- [ ] ¿Cómo funcionan los enlaces a las entradas?
- [x] ¿Sabes algo sobre el funcionamiento de los newsletter? - No asi que tengo que encargarme de la configuracion
- [x] Encargarme de que hay un panel de administrador fuera del studio donde pueda encontrar una lista con los emails subscritos y las personas que llenaron el formulario

---

## ✅ Tareas de Desarrollo

### Fase 1: Análisis y Diseño (1 día)

- [x] Revisar y aprobar wireframes con Sebastián
- [x] Definir paleta de colores exacta (códigos hex)
- [x] Seleccionar tipografías
- [x] Crear moodboard en Figma
- [x] Definir arquitectura de navegación
- [ ] Aprobar diseño final antes de desarrollo

### Fase 2: Configuración Inicial

- [ ] Configurar variables de entorno (.env.local)
- [ ] Configurar proyecto de Sanity (projectId y dataset)
- [ ] Configurar Supabase para base de datos
- [ ] Configurar Prisma con Supabase
- [ ] Crear schemas de Sanity para:
  - [ ] Hero section
  - [ ] Eventos
  - [ ] Testimonios
  - [ ] Sobre Ultramadness
  - [ ] Preguntas Frecuentes
  - [ ] Configuración del sitio
  - [ ] Blog posts (si aplica)

### Fase 3: Desarrollo Front-End (2-3 días)

- [ ] Crear layout principal con navegación
- [ ] Implementar Hero section con imagen de fondo
- [ ] Crear sección de próximos eventos
  - [ ] Card de evento con imagen, título, fecha, ubicación
  - [ ] Botón de compra que redirija a Prime Tickets
  - [ ] Filtros por fecha/género (opcional)
- [ ] Crear sección "Sobre Ultramadness"
  - [ ] Texto descriptivo
  - [ ] Características principales con iconos
- [ ] Implementar slider de testimonios con tabs
  - [ ] Testimonios en video
  - [ ] Testimonios en texto
- [ ] Crear sección de últimas performances (galería de fotos)
- [ ] Implementar formulario de registro
  - [ ] Campos: nombre, email, teléfono
  - [ ] Selector de preferencias musicales
  - [ ] Validaciones del lado del cliente
  - [ ] Mensajes de éxito/error
- [ ] Crear footer con redes sociales y contacto
- [ ] Implementar página de blog (si aplica)
  - [ ] Listado de posts
  - [ ] Página individual de post
  - [ ] Categorías/filtros
- [ ] Hacer todo responsive (mobile-first)

### Fase 4: Desarrollo Back-End (1-2 días)

- [ ] Crear API route para guardar registros del formulario
- [ ] Configurar Prisma schema para tabla de registros
- [ ] Implementar validaciones del lado del servidor
- [ ] Crear endpoint para exportar registros (CSV/Excel)
- [ ] Implementar protección contra spam (rate limiting)
- [ ] Crear queries de Sanity para obtener contenido
- [ ] Implementar ISR (Incremental Static Regeneration) para eventos

### Fase 5: Newsletter y Comunicación (1 día)

- [ ] Configurar servicio de email (Resend/SendGrid/Brevo)
- [ ] Crear templates de email
  - [ ] Email de bienvenida
  - [ ] Notificación de nuevo evento
  - [ ] Newsletter mensual
- [ ] Implementar segmentación por preferencias musicales
- [ ] Crear endpoint para envío de newsletters
- [ ] Probar envío de correos

### Fase 6: Optimización y SEO

- [ ] Optimizar imágenes (Next.js Image)
- [ ] Implementar lazy loading
- [ ] Configurar metadatos SEO
  - [ ] Títulos y descripciones por página
  - [ ] Open Graph tags
  - [ ] Twitter cards
- [ ] Crear sitemap.xml
- [ ] Configurar robots.txt
- [ ] Implementar Google Analytics (si aplica)

### Fase 7: Pruebas y Lanzamiento (1 día)

- [ ] Probar formulario de registro end-to-end
- [ ] Verificar enlaces a Prime Tickets
- [ ] Probar envío de newsletters
- [ ] Verificar responsive en diferentes dispositivos
- [ ] Probar en diferentes navegadores
- [ ] Verificar velocidad de carga (Lighthouse)
- [ ] Revisar accesibilidad (a11y)
- [ ] Deploy en Vercel
- [ ] Configurar dominio personalizado
- [ ] Configurar SSL
- [ ] Probar en producción
- [ ] Entregar accesos a Sebastián:
  - [ ] Sanity Studio
  - [ ] Vercel
  - [ ] Base de datos
  - [ ] Servicio de email

### Documentación

- [ ] Crear guía de uso de Sanity Studio
- [ ] Documentar cómo crear nuevos eventos
- [ ] Documentar cómo enviar newsletters
- [ ] Documentar cómo exportar registros
- [ ] Crear video tutorial básico (opcional)

---

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16 + React 19 + TypeScript
- **Estilos**: TailwindCSS 4
- **CMS**: Sanity
- **Base de Datos**: Supabase + Prisma
- **Email**: Resend/SendGrid/Brevo
- **Hosting**: Vercel
- **Diseño**: Figma

---

## ⏱️ Timeline Estimado

- **Fase 1**: 1 día
- **Fase 2-3**: 2-3 días
- **Fase 4**: 1-2 días
- **Fase 5**: 1 día
- **Fase 6-7**: 1 día

**Total**: 5-7 días hábiles
