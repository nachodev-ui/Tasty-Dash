// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { Categoria } from '@/types/interfaces'

const prisma: PrismaClient = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<Categoria[]>) {

  const categorias = await prisma.categoria.findMany()

  res.status(200).json(categorias)
}
