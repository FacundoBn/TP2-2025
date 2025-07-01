# TP2-2025-Trabajo Practico Final
# 📘 API de Estacionamiento - Proyecto TP2 2025
Este proyecto gestiona vehículos, lugares de estacionamiento, ocupaciones y usuarios (con autenticación y roles) mediante una API REST construida con Express.js y Sequelize sobre una base de datos MySQL.


## 🔐 Autenticación
Para Probar JWT primero ejecutan el login en el archivo test, ese request devuelve un token:

### Login de usuario
POST http://localhost:3000/usuarios/login
Content-Type: application/json

{
"email": "operador1@mail.com",
"password": "operador12345"

}

--Ejemplo de respuesta--
{
  "mensaje": "Bienvenido, Admin Uno.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBjb3JyZW8uY29tIiwicm9sIjoiYWRtaW4iLCJpYXQiOjE3NTEwNzIzMzMsImV4cCI6MTc1MTA3NTkzM30.dBPCHZ510En3DFQ6e3T6w15VWT87SxlKZjjbwG3aX7A"
}

## Dejo usuarios de prueba
admin@correo.com
admin123

operador@correo.com
operador123

Luego para probar tras rutas, por ejemplo listar usuarios deben pegar ese token:

### Listar usuarios (requiere token válido)
GET http://localhost:3000/usuarios
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBjb3JyZW8uY29tIiwicm9sIjoiYWRtaW4iLCJpYXQiOjE3NTEwNjc3MzksImV4cCI6MTc1MTA3MTMzOX0.wZPdyuYVfCqVtJMw2C6rDEz-HEnjzIcxOflEFMHPoOo


## 🚘 Vehículos

| Método | Endpoint                | Descripción                      |
|--------|-------------------------|----------------------------------|
| GET    | /vehiculos              | Lista todos los vehículos        |
| GET    | /vehiculos/:patente     | Busca un vehículo por patente    |
| POST   | /vehiculos              | Crea un vehículo                 |
| DELETE | /vehiculos/:patente     | Elimina un vehículo              |

**Body para crear:**
```json
{
  "patente": "ABC123",
  "marca": "Toyota",
  "modelo": "Etios"
}
```

---

## 🅿️ Estacionamientos

| Método | Endpoint                     | Descripción                              |
|--------|------------------------------|------------------------------------------|
| GET    | /estacionamientos            | Lista todos los lugares                  |
| POST   | /estacionamientos            | Crea un nuevo lugar                      |
| PUT    | /estacionamientos/:id        | Actualiza un lugar                       |
| DELETE | /estacionamientos/:id        | Elimina un lugar                         |

**Body para crear/actualizar:**
```json
{
  "ubicacion": "Piso 1 - Lugar 3",
  "estado": "disponible"
}
```

---

## 🕓 Ocupaciones

| Método | Endpoint                              | Descripción                                         |
|--------|---------------------------------------|-----------------------------------------------------|
| POST   | /ocupaciones/ingresar                 | Registra ingreso de un vehículo                    |
| PUT    | /ocupaciones/salir/:id                | Salida por ID (devuelve ticket)                    |
| PUT    | /ocupaciones/salir/patente/:patente   | Salida por patente (devuelve ticket)               |
| GET    | /ocupaciones/activos                  | Lista ocupaciones activas                          |
| GET    | /ocupaciones/inactivos                | Lista ocupaciones finalizadas                      |
| GET    | /ocupaciones/historial                | Historial completo                                 |
| GET    | /ocupaciones/lugar/:id                | Verifica si un lugar está ocupado                  |
| DELETE | /ocupaciones/eliminar/:id             | Elimina una ocupación (admin)                      |

**Body para ingreso:**
```json
{
  "patente": "ABC123"
}
```

---

## 🧪 Pruebas con Thunder Client o Postman

1. Iniciar sesión y guardar cookie/token
2. Usar endpoints de forma autenticada
3. Probar entradas válidas e inválidas

---

## ✨ Roles

- `admin`: acceso total
- `operador`: puede registrar ingresos/salidas

---

## 📅 Tarifa

- $1000 por cada hora o fracción desde la entrada

---

## 📦 Estructura

```
TP2-2025/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── connection/
├── index.js
└── ...
```

---



