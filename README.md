# Task Manager

Bienvenidos a **Task Manager**, una aplicación para la gestión de tareas.

## Requisitos

Antes de empezar, asegúrate de tener configurado el archivo `.env` con las siguientes variables:

```env
JWT_SECRET=ElSecreto
JWT_EXPIRATION=1d

MONGODB_URI=mongodb://localhost:27017/nombreDeLaDB

luego ejecutar el siguiente comando:
node scripts/initializeUser.js

Credenciales de acceso a la cuenta task manager web
USUARIO admin@coally.com
PASSWORD holamundo