'use server'
import { prisma } from '@/lib/db'
import { Glass } from '@prisma/client';

export async function createGlass(data: Glass) {
  return prisma.glass.create({ data })
}

export async function getGlasses() {
  return prisma.glass.findMany({
    include: {
      inventory: true,
      layers: true
    }
  })
}

export async function getGlassById(id: string) {
  return prisma.glass.findUnique({
    where: { id },
    include: {
      inventory: true,
      layers: true
    }
  })
}

export async function updateGlass(id: string, data: Glass) {
  return prisma.glass.update({ where: { id }, data })
}

export async function deleteGlass(id: string) {
  return prisma.glass.delete({ where: { id } })
}
