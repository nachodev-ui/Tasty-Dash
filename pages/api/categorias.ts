// pages/api/categorias.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { Categoria, PrismaClient } from '@prisma/client'

const prisma: PrismaClient = new PrismaClient()

// Utilizando el tipo de dato Categoria de Prisma Client (npx prisma generate)
export default async function handler(req: NextApiRequest, res: NextApiResponse<Categoria[]>) {
  try {
    const categorias: Categoria[] = await prisma.categoria.findMany({
      include: {
        productos: true
      }
    })
    res.status(200).json(categorias)
  } catch (error) {
    console.error(error)
    res.status(500).json([])
  }
}
