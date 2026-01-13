# Work Management API

API REST para la gestión de usuarios, trabajos, reportes y alertas.  
Proyecto de backend desarrollado como sistema completo con autenticación, roles y documentación integrada.

---

## Descripción

Este proyecto implementa un servidor backend con **Node.js y Express** que permite:

- Autenticación mediante JWT
- Gestión de usuarios con roles (admin, office, worker)
- Gestión de trabajos
- Creación de reportes con subida de imágenes
- Sistema de alertas entre usuarios
- Documentación automática con Swagger

Está pensado como proyecto personal y de portfolio, siguiendo buenas prácticas de arquitectura y seguridad.

---

## Estructura del proyecto

Proyecto-Personal-Servidor
├─ src
│ ├─ controllers
│ ├─ helpers
│ ├─ middlewares
│ ├─ models
│ ├─ public
│ ├─ routes
│ ├─ socket.js
│ ├─ swagger.json
│ └─ app.js
├─ querys.postgre.sql
├─ .env.template
├─ package.json
└─ README.md

---

## Tecnologías utilizadas

- Node.js
- Express.js
- JSON Web Tokens (JWT)
- Swagger UI (OpenAPI 3.0)
- Multer (subida de archivos)
- PostgreSQL
- Socket.IO
- dotenv
- cors

---

## Instalación

Clona el repositorio:
``` bash
git clone https://github.com/PabloGartzi/Proyecto-Personal-Servidor.git
cd Proyecto-Personal-Servidor
```

Instala las dependencias:
``` bash
npm install
```

---

## Configuración de entorno
Crea un archivo .env a partir de la plantilla:

``` bash
cp .env.template .env (linux o mac)
copy .env.template .env (windows)
```

---

## Configura las variables necesarias:

```
PORT=4001
SECRET_KEY=clave_secreta_jwt

DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=password
DB_NAME=database
```

---

## Ejecución del proyecto
``` bash
npm run dev
```

El servidor se levantará por defecto en:
```
http://localhost:4001
```

---

## Documentación de la API
La API está documentada con Swagger.

Accede desde el navegador a:

```
http://localhost:4001/api-docs
```

Incluye:
- Endpoints
- Métodos HTTP
- Autenticación
- Códigos de error
- Esquemas de datos

---

## Autenticación y seguridad
- Autenticación basada en JWT
- Middleware de validación de token
- Control de acceso por roles:
  - admin
  - office
  - worker
- Protección de rutas privadas
- Configuración CORS con whitelist

---

## Roles del sistema
Admin
- Gestión completa de usuarios
- Acceso a estadísticas del sistema

Office
- Gestión completa de trabajos
- Asignación y edición de trabajos

Worker
- Visualización de trabajos asignados
- Creación de reportes con imagen

---

## Endpoints principales
## Auth

| Método | Ruta    | Descripción        |
|--------|--------|------------------|
| POST   | /login | Login de usuario  |
| POST   | /renew | Renovar token JWT |

---

## Admin

| Método | Ruta                    | Descripción          |
|--------|------------------------|-------------------|
| GET    | /admin/dashboard        | Listar usuarios    |
| GET    | /admin/dashboard/{id}   | Usuario por ID     |
| POST   | /admin/createUser       | Crear usuario      |
| POST   | /admin/updateUser/{id}  | Actualizar usuario |
| DELETE | /admin/deleteUser/{id}  | Eliminar usuario   |
| GET    | /admin/statistics       | Estadísticas       |

---

## Office

| Método | Ruta                        | Descripción         |
|--------|----------------------------|------------------|
| GET    | /office/dashboard          | Listar trabajos   |
| GET    | /office/dashboard/{id}     | Trabajo por ID    |
| POST   | /office/createWork         | Crear trabajo     |
| POST   | /office/updateWork/{id}    | Actualizar trabajo|
| DELETE | /office/deleteWork/{id}    | Eliminar trabajo  |

---

## Worker

| Método | Ruta                                     | Descripción             |
|--------|-----------------------------------------|------------------------|
| POST   | /worker/createReport/{job_id}/{worker_user_id} | Crear reporte con imagen |

---

## Alerts

| Método | Ruta               | Descripción       |
|--------|------------------|----------------|
| POST   | /alerts/send     | Enviar alerta  |
| GET    | /alerts/get      | Obtener alertas|
| DELETE | /alerts/{alertId}| Eliminar alerta|

---

## Base de datos

El repositorio incluye un archivo `querys.postgre.sql` con ejemplos de consultas y estructura inicial de base de datos para PostgreSQL.

---

## Manejo de errores

La API devuelve errores estandarizados con el siguiente formato:

```json
{
  "ok": false,
  "msg": "Descripción del error"
}
```
Los errores están documentados en Swagger mediante `components.responses`.

---

## Licencia
Proyecto de uso libre con fines educativos y de aprendizaje.

---

## Autor
Proyecto desarrollado por Pablo García.
