import express from "express";
import productRoutes from "./routes/products.routes.js";
import categoryRoutes from "./routes/categories.routes.js";

const app = express();

// Middleware global: parsea body JSON y lo deja en req.body.
app.use(express.json());

// Monta routers bajo prefijo /api. Ejemplo: /products -> /api/products
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);

app.listen(3000);
console.log("Server on port", 3000);