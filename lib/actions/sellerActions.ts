'use server'
import { prisma } from '@/lib/db'

export async function createSeller(data: { name: string; info?: string }) {
  return prisma.seller.create({ data })
}

export async function getSellers() {
  return prisma.seller.findMany({
    include: {
      inventory: true
    }
  })
}

export async function getSellerById(id: string) {
  return prisma.seller.findUnique({
    where: { id },
    include: { inventory: true }
  })
}

export async function updateSeller(id: string, data: { name?: string; info?: string }) {
  return prisma.seller.update({ where: { id }, data })
}

export async function deleteSeller(id: string) {
  return prisma.seller.delete({ where: { id } })
}
