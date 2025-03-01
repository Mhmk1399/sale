// 'use server'

// import { prisma } from './db'
// import { revalidatePath } from 'next/cache'

// // Glass Actions
// export async function createGlass(data: { name: string; code: string; sellPrice: number }) {
//   try {
//     const glass = await prisma.glass.create({
//       data
//     })
//     revalidatePath('/glasses')
//     return { success: true, data: glass }
//   } catch (error) {
//     return { success: false, error: 'Failed to create glass' }
//   }
// }   

// export async function updateGlass(id: string, data: { name?: string; code?: string; sellPrice?: number }) {
//   try {
//     const glass = await prisma.glass.update({
//       where: { id },
//       data
//     })
//     revalidatePath('/glasses')
//     return { success: true, data: glass }
//   } catch (error) {
//     return { success: false, error: 'Failed to update glass' }
//   }
// }

// export async function deleteGlass(id: string) {
//   try {
//     await prisma.glass.delete({
//       where: { id }
//     })
//     revalidatePath('/glasses')
//     return { success: true }
//   } catch (error) {
//     return { success: false, error: 'Failed to delete glass' }
//   }
// }

// // Invoice Actions
// export async function createInvoice(data: {
//   layers: {
//     glassId: string
//     width: number
//     height: number
//     treatments: string[] // Array of treatment IDs
//   }[]
//   layersLength: number
//   type: string
//   count: number
//   sideMaterials: { sideMaterialId: string; quantity: number }[]
//   priorityId: string
//   customer: string
//   dueDate: Date
// }) {
//   try {
//     const invoice = await prisma.invoice.create({
//       data: {
//         layersLength: data.layersLength,
//         type: data.type,
//         count: data.count,
//         priorityId: data.priorityId,
//         customer: data.customer,
//         dueDate: data.dueDate,
//         layers: {
//           create: data.layers.map(layer => ({
//             glass: { connect: { id: layer.glassId } },
//             width: layer.width,
//             height: layer.height,
//             treatments: {
//               create: layer.treatments.map(treatmentId => ({
//                 treatment: { connect: { id: treatmentId } }
//               }))
//             }
//           }))
//         },
//         sideMaterials: {
//           create: data.sideMaterials.map(sm => ({
//             sideMaterial: { connect: { id: sm.sideMaterialId } },
//             quantity: sm.quantity
//           }))
//         }
//       }
//     })
//     revalidatePath('/invoices')
//     return { success: true, data: invoice }
//   } catch (error) {
//     return { success: false, error: 'Failed to create invoice' }
//   }
// }

// export async function updateInvoice(id: string, data: {
//   layersLength?: number
//   type?: string
//   count?: number
//   customer?: string
//   dueDate?: Date
//   priorityId?: string
// }) {
//   try {
//     const invoice = await prisma.invoice.update({
//       where: { id },
//       data
//     })
//     revalidatePath('/invoices')
//     return { success: true, data: invoice }
//   } catch (error) {
//     return { success: false, error: 'Failed to update invoice' }
//   }
// }

// export async function deleteInvoice(id: string) {
//   try {
//     await prisma.invoice.delete({
//       where: { id }
//     })
//     revalidatePath('/invoices')
//     return { success: true }
//   } catch (error) {
//     return { success: false, error: 'Failed to delete invoice' }
//   }
// } 