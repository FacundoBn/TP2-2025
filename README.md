# TP2-2025-Trabajo Practico Final

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

