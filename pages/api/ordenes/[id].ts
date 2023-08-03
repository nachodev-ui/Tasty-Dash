import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    const { id } = req.query

    const ordenActualizada = await prisma.orden.update({
      where: {
        id: parseInt(id as string),
      },
      data: {
        estado: true,
      },
    })
    res.status(200).json(ordenActualizada)
  }
}