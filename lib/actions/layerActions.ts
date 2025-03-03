'use server'
import { prisma } from '@/lib/db'
import { LayerTreatment, Layer } from '@prisma/client'

interface LayerWithTreatments extends Layer {
  treatments: LayerTreatment[]
}

export async function createLayer(data: {
  glassId: string
  width: string
  height: string
  treatmentIds: string[]
  invoiceId: string
}) {
  return prisma.layer.create({
    data: {
      glassId: data.glassId,
      width: data.width,
      height: data.height,
      invoiceId: data.invoiceId,
      treatments: {
        connect: data.treatmentIds.map(id => ({ id }))
      }
    }
  })
}


export async function getLayers() {
  return prisma.layer.findMany({
    include: {
      glass: true,
      treatments: true,
      invoice: true
    }
  })
}

export async function updateLayer(id: string, data: Layer) {
  return prisma.layer.update({ where: { id }, data })
}

export async function deleteLayer(id: string) {
  return prisma.layer.delete({ where: { id } })
}
