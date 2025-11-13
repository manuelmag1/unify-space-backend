# Unify Space Backend - bdgrupo13

Backend API para el proyecto Espacio de Trabajo Unificado con MongoDB Atlas.

## 🚀 Tecnologías

- Node.js + Express
- TypeScript
- MongoDB Atlas (Mongoose)
- JWT Authentication
- bcryptjs para hashing de contraseñas

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales
```

## 🔧 Configuración

Edita el archivo `.env` con tus credenciales:

```env
MONGODB_URI=tu_connection_string_de_mongodb_atlas
PORT=5000
JWT_SECRET=tu_secreto_jwt
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
```

## 🏃‍♂️ Ejecución

```bash
# Modo desarrollo (con hot reload)
npm run dev

# Compilar para producción
npm run build

# Ejecutar producción
npm start
```

## 📡 API Endpoints

### Autenticación

- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual (requiere token)

### Materias (Subjects)

- `GET /api/subjects` - Obtener todas las materias del usuario
- `POST /api/subjects` - Crear nueva materia
- `PUT /api/subjects/:id` - Actualizar materia
- `DELETE /api/subjects/:id` - Eliminar materia

### Páginas

- `GET /api/pages/subject/:subjectId` - Obtener páginas de una materia
- `GET /api/pages/:id` - Obtener una página específica
- `POST /api/pages` - Crear nueva página
- `PUT /api/pages/:id` - Actualizar página
- `DELETE /api/pages/:id` - Eliminar página

### Bloques

- `GET /api/blocks/page/:pageId` - Obtener bloques de una página
- `POST /api/blocks` - Crear nuevo bloque
- `PUT /api/blocks/:id` - Actualizar bloque
- `DELETE /api/blocks/:id` - Eliminar bloque

## 🔐 Autenticación

Todas las rutas excepto `/api/auth/register` y `/api/auth/login` requieren un token JWT en el header:

```
Authorization: Bearer <tu_token>
```

## 📝 Estructura del Proyecto

```
src/
├── config/
│   └── db.ts              # Configuración MongoDB
├── middleware/
│   └── auth.ts            # Middleware de autenticación
├── models/
│   ├── User.ts            # Modelo de Usuario
│   ├── Subject.ts         # Modelo de Materia
│   ├── Page.ts            # Modelo de Página
│   └── Block.ts           # Modelo de Bloque
├── routes/
│   ├── auth.ts            # Rutas de autenticación
│   ├── subjects.ts        # Rutas de materias
│   ├── pages.ts           # Rutas de páginas
│   └── blocks.ts          # Rutas de bloques
├── app.ts                 # Configuración de Express
└── server.ts              # Punto de entrada
```

## 🛠️ Desarrollo

Creado por bdgrupo13
