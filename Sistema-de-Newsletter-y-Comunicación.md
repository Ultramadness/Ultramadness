# Sistema de Newsletter y Comunicación de Ultramadness

> **Tech Stack & Herramientas**
> Para mantener la consistencia con el proyecto actual (verificado en `package.json`), se **debe** utilizar estrictamente:
>
> - **Framework:** Next.js 15+ (App Router).
> - **Lenguaje:** TypeScript / React 19.
> - **Estilos:** Tailwind CSS v4.
> - **UI Components:** Shadcn UI (Radix Primitives).
> - **Formularios:** React Hook Form + Zod (validación).
> - **Base de Datos:** Prisma (PostgreSQL).
> - **Emails:** Resend + React Email.
> - **Iconos:** Lucide React / Remix Icon.
> - **Package Manager:** `pnpm` (usando `pnpm dlx` para CLI de shadcn).

Este documento integra la gestión de audiencia unificada y el sistema de campañas de email personalizadas, incluyendo la gestión de templates.

---

## 1. Gestión de Audiencia Unificada

Centralización de contactos provenientes de Suscripciones (Newsletter) y Mensajes (Formulario de Contacto).

### 1.1 UI: Tabla de Audiencia (`AudienceTable`)

- **Referencia Visual:** `app/(routes)/admin/newsletter/page.tsx` (estilo de tablas limpio con bordes redondeados).
- **Ubicación:** `/admin/audiencia/page.tsx`.
- **Componentes a Implementar:**
  - **Header:** Título "Audiencia" y subtítulo con métricas rápidas (Total, Fuentes).
  - **Filtros (Faceted Filters):** Dropdowns estilo Shadcn para filtrar por:
    - _Origen_ (Newsletter vs Contacto).
    - _Género Musical_ (Tags extraídos de contactos).
  - **Data Table:** Tabla usando componentes de `table` (Shadcn) con columnas:
    - **Usuario:** Avatar (fallback de iniciales) + Email + Nombre.
    - **Info:** Badges de colores para "Fuente" (ej: Azul para Footer, Verde para Contacto).
    - **Intereses:** Badge outline con el género musical.
    - **Fecha:** Formato `dd/MM/yyyy HH:mm`.
    - **Acciones:** Dropdown menu: "Enviar Email Directo", "Ver Detalles".
- **Empty State:** Componente visual cuando no hay resultados (icono de usuario + texto muted).

---

## 2. Gestión de Templates de Email

Sistema para crear, guardar y reutilizar diseños de correos electrónicos.

### 2.1 Modelo de Datos (Prisma)

Se agregará el modelo `EmailTemplate` para persistir los diseños.

```prisma
model EmailTemplate {
  id          String   @id @default(cuid())
  name        String   // Nombre interno del template (ej: "Promo Tech House")
  subject     String   // Asunto por defecto
  title       String   // Título H1 del email
  body        String   // Contenido en Markdown
  imageUrl    String?  // URL de la imagen de cabecera
  ctaText     String?  // Texto del botón
  ctaUrl      String?  // URL del botón
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("email_templates")
}
```

### 2.2 UI: Galería de Templates (`TemplatesGrid`)

- **Referencia Visual:** `components/admin/AdminEvents.tsx` / `EventCard.tsx` (Grid de tarjetas).
- **Ubicación:** `/admin/comunicacion/templates`.
- **Componentes a Implementar:**
  - **TemplateCard:** Tarjeta con previsualización del layout (mockup simplificado), título del template y acciones (Editar, Usar en Campaña, Eliminar).
  - **Botón "Nuevo Template":** Acción principal que lleva al editor.

### 2.3 UI: Editor de Template (`TemplateEditor`)

- **Referencia Visual:** `components/admin/LoginForm.tsx` (Formularios limpios con labels y validación).
- **Ubicación:** `/admin/comunicacion/templates/[id]`.
- **Formulario (React Hook Form + Zod):**
  - `name`: Input texto.
  - `subject`: Input texto.
  - `imageUrl`: Input con preview de imagen.
  - `body`: Textarea autoresize o editor Markdown simple.
  - `cta`: Group (Texto + URL).
  - **Live Preview:** Panel lateral derecho mostrando el email renderizado en tiempo real (usando el componente `CustomCampaignEmail` pasándole las props del form).

---

## 3. Centro de Comunicaciones (Campañas)

Flujo para crear y enviar correos masivos o segmentados.

### 3.1 UI: Dashboard de Comunicación

- **Ubicación:** `/admin/comunicacion`.
- **Componentes:**
  - **Accesos Rápidos:** Tarjetas grandes para "Nueva Campaña General", "Nueva Campaña Segmentada", "Gestionar Templates".
  - **Historial:** Tabla de últimos envíos (si se implementa registro de logs).

### 3.2 UI: Asistente de Envío de Campaña (`CampaignWizard`)

- **Paso 1: Selección de Contenido**
  - Opción A: Cargar un `EmailTemplate` existente (Dropdown select).
  - Opción B: Escribir desde cero (carga el `TemplateEditor` inline).
- **Paso 2: Selección de Audiencia**
  - **Radio Group (Shadcn):**
    - "Todos los Suscriptores" (Broadcast).
    - "Segmentar por Interés" (Select multi-opción de géneros).
    - "Segmentar por Origen".
  - **Contador Dinámico:** Badge que muestra "Se enviará a X personas" recalculado al cambiar filtros.
- **Paso 3: Confirmación y Envío**
  - Modal de alerta (Alert Dialog) confirmando la acción masiva.
  - Feedback de progreso (Loading spinner / Toast de Sonner).

---

## 4. Componentes de Email (React Email)

### `CustomCampaignEmail.tsx`

Componente flexible que renderiza el contenido dinámico guardado en los templates.

- Recibe props: `title`, `body` (markdown parseado), `imageUrl`, `ctaText`, `ctaUrl`.
- Utiliza el layout base de la marca (colores oscuros, logo Ultramadness).

---

## 5. Roadmap de UI

1.  **Schema Update:** Agregar modelo `EmailTemplate`.
2.  **UI Audiencia:** Página `/admin/audiencia` con tabla y filtros.
3.  **UI Templates:** CRUD de Templates (Grid + Editor + Preview).
4.  **Backend:** Server Actions para CRUD de templates y fetching de audiencia unificada.
5.  **UI Wizard:** Página de creación de campaña conectando Templates + Audiencia + Envío (Resend).
