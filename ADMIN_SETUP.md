# Configuración del Panel de Administración

## Crear un Usuario Admin

Para crear un nuevo usuario administrador, ejecuta el siguiente comando:

```bash
npx tsx scripts/create-admin.ts <email> <contraseña>
```

### Ejemplo:

```bash
npx tsx scripts/create-admin.ts admin@example.com miContraseña123
```

## Usuarios Admin Actuales

- `mp.marcosadrian3@gmail.com` - Contraseña: `admin123`

## Acceder al Panel

1. Ve a `http://localhost:3000/admin`
2. Serás redirigido a la página de login
3. Ingresa tu email y contraseña
4. Accederás al panel de administración

## Funcionalidades del Panel

### Formularios de Contacto

- Ver todos los mensajes recibidos del formulario de contacto
- Información completa: nombre, email, teléfono, género musical, mensaje
- Indicador si el usuario quiere recibir noticias

### Newsletter

- Ver todos los suscriptores del newsletter
- Estadísticas por origen (footer o formulario de contacto)
- Exportar lista de emails (próximamente)

### Contenido

- Acceso directo a Sanity Studio para gestionar el contenido del sitio

## Seguridad

- Las contraseñas se almacenan hasheadas con bcrypt
- Las sesiones se manejan con JWT
- Solo usuarios registrados en la base de datos pueden acceder
- El middleware protege todas las rutas `/admin/*`

## Variables de Entorno

Asegúrate de tener configuradas estas variables en `.env.local`:

```env
AUTH_SECRET="tu-secret-key-aqui"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="tu-database-url"
```
