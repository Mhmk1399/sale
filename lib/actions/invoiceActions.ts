'use server'
import { prisma } from '@/lib/db'

export async function createInvoice(data: {
  layersLength: number
  type: string
  count: number
  priorityId: string
  customer: string
  dueDate: Date
  layers?: any[] // Define proper type
  sideMaterials?: any[] // Define proper type
}) {
  return prisma.invoice.create({
    data: {
      ...data,
      layers: {
        create: data.layers
      },
      sideMaterials: {
        create: data.sideMaterials
      }
    }
  })
}

export async function getInvoices() {
  return prisma.invoice.findMany({
    include: {
      layers: {
        include: {
          treatments: true
        }
      },
      sideMaterials: true,
      priority: true
    }
  })
}

export async function updateInvoice(id: string, data: any) { // Define proper type
  return prisma.invoice.update({
    where: { id },
    data
  })
}

export async function deleteInvoice(id: string) {
  return prisma.invoice.delete({ where: { id } })
}
