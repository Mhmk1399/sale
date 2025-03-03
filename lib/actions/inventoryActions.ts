'use server'
import { prisma } from '@/lib/db'
import { Inventory } from '@prisma/client'

export async function createInventory(data: Inventory) {
  return prisma.inventory.create({ data })
}

export async function getInventory() {
  return prisma.inventory.findMany({
    include: {
      glass: true,
      sideMaterial: true,
      seller: true
    }
  })
}

export async function updateInventory(id: string, data: Inventory) {
  return prisma.inventory.update({ where: { id }, data })
}

export async function deleteInventory(id: string) {
  return prisma.inventory.delete({ where: { id } })
}
