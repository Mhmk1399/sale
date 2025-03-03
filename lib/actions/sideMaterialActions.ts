'use server'
import { prisma } from '@/lib/db'
import { SideMaterial } from '@prisma/client';

export async function createSideMaterial(data: SideMaterial) {
  return prisma.sideMaterial.create({ data })
}

export async function getSideMaterials() {
  return prisma.sideMaterial.findMany({
    include: {
      inventory: true,
      invoices: true
    }
  })
}

export async function updateSideMaterial(id: string, data:SideMaterial) {
  return prisma.sideMaterial.update({ where: { id }, data })
}

export async function deleteSideMaterial(id: string) {
  return prisma.sideMaterial.delete({ where: { id } })
}
