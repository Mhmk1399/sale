'use server'
import { prisma } from '@/lib/db'
import { Priority } from '@prisma/client';

export async function createPriority(data: Priority) {
  return prisma.priority.create({ data })
}

export async function getPriorities() {
  return prisma.priority.findMany({
    include: {
      invoices: true
    }
  })
}

export async function updatePriority(id: string, data: Priority) {
  return prisma.priority.update({ where: { id }, data })
}

export async function deletePriority(id: string) {
  return prisma.priority.delete({ where: { id } })
}
