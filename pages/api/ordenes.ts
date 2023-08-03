import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Orden } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<Orden[] | Orden>) {

  // GET
  const ordenes: Orden[] = await prisma.orden.findMany({
    where: {
      estado: false
    },
  })
  res.status(200).json(ordenes)


  // POST
  if (req.method === 'POST') {
    const orden: Orden = await prisma.orden.create({
      data: {
        nombre: req.body.nombre,
        total: req.body.total,
        pedido: req.body.pedido,
        fecha: req.body.fecha,
      },
    })
    res.status(200).json(orden)
  }
}
