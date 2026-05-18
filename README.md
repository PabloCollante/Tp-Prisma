# Trabajo Práctico: Modelo de Datos Relacional con Prisma y MySQL

## 📖 Descripción
Este proyecto implementa el backend para un sistema de e-commerce básico utilizando Node.js, Express, Prisma ORM (v7) y MySQL alojado en Docker.

## 🔗 Modelo de Datos y Relaciones
El sistema está compuesto por 5 entidades principales:
* **Category (1) -> (N) Product:** Una categoría agrupa múltiples productos.
* **User (1) -> (N) Order:** Un usuario puede registrar múltiples compras (órdenes).
* **Order (1) -> (N) OrderItem:** Una orden se compone de múltiples líneas de detalle.
* **Product (1) -> (N) OrderItem:** Un producto puede estar presente en múltiples líneas de detalle a lo largo de diferentes órdenes.

La relación "Muchos a Muchos" entre `Order` y `Product` se resolvió lógicamente a través de la entidad intermedia `OrderItem`.

## 🚀 Pasos para ejecutar el proyecto

1. **Requisitos previos:** Tener Node.js y Docker instalados.
2. **Instalar dependencias:**
   ```bash
   npm install