import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/tp-test", async (req, res) => {
  try {
    // Creamos la Categoría (Prisma le asignará el ID real automáticamente)
    const categoria = await prisma.category.create({
      data: { name: "Setups y Periféricos" }
    });

    // Creamos los Productos usando el ID real de la categoría recién creada
    const prod1 = await prisma.product.create({
      data: { name: "Teclado Mecánico RGB", price: 1500, categoryId: categoria.id }
    });
    const prod2 = await prisma.product.create({
      data: { name: "Mouse Pad XXL", price: 500, categoryId: categoria.id }
    });

    // Creamos el Usuario
    const usuario = await prisma.user.create({
      data: { name: "Pablo", email: "pablocarp@ejemplo.com" }
    });

    // Creamos la Orden asociando el usuario y los productos (OrderItem)
    const nuevaOrden = await prisma.order.create({
      data: {
        userId: usuario.id,
        items: {
          create: [
            { quantity: 1, price: prod1.price, productId: prod1.id },
            { quantity: 2, price: prod2.price, productId: prod2.id }
          ]
        }
      }
    });

    // LA CONSULTA 
    const orderDetails = await prisma.order.findFirst({
      where: { id: nuevaOrden.id },
      include: {
        user: true,
        items: {
          include: {
            product: {
              include: { category: true }
            }
          }
        }
      }
    });

    res.json({
      mensaje: "Funca",
      datos: orderDetails
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error" });
  }
});

// Ruta para VER todos los productos (la que ya tenías)
router.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

export default router;