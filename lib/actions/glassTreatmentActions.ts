'use server'
import { prisma } from '@/lib/db'
import { GlassTreatment } from '@prisma/client'

export async function createGlassTreatment(data: GlassTreatment) {
  return prisma.glassTreatment.create({ data })
}

export async function getGlassTreatments() {
  return prisma.glassTreatment.findMany({
    include: {
      layers: true
    }
  })
}

export async function updateGlassTreatment(id: string, data: GlassTreatment) {
  return prisma.glassTreatment.update({ where: { id }, data })
}

export async function deleteGlassTreatment(id: string) {
  return prisma.glassTreatment.delete({ where: { id } })
}
