'use server'
import { prisma } from '@/lib/db'

export async function createCustomer(data: { name: string; email: string; phone?: string; address?: string }) {
  return prisma.customer.create({ data })
}

export async function getCustomers() {
  return prisma.customer.findMany()
}

export async function getCustomerById(id: number) {
  return prisma.customer.findUnique({ where: { id } })
}

export async function updateCustomer(id: number, data: { name?: string; email?: string; phone?: string; address?: string }) {
  return prisma.customer.update({ where: { id }, data })
}

export async function deleteCustomer(id: number) {
  return prisma.customer.delete({ where: { id } })
}
