import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Producto } from '@prisma/client'

const prisma: PrismaClient = new PrismaClient()

// Utilizando el tipo de dato Producto de Prisma Client (npx prisma generate)

export default async function handler(req: NextApiRequest, res: NextApiResponse<Producto[]>) {
  const productos = await prisma.producto.findMany({
    where: {
      categoriaId: 1
    }
  })
  res.status(200).json(productos)
}
