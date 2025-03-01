// import { prisma } from '@/lib/db'

// export async function InvoiceList() {
//   const invoices = await prisma.invoice.findMany({
//     include: {
//       layers: {
//         include: {
//           glass: true,
//           treatments: {
//             include: {
//               treatment: true
//             }
//           }
//         }
//       },
//       sideMaterials: {
//         include: {
//           sideMaterial: true
//         }
//       },
//       priority: true
//     },
//     orderBy: { createdAt: 'desc' }
//   })

//   return (
//     <div>
//       <h2>Invoices</h2>
//       <div className="grid gap-4">
//         {invoices.map(invoice => (
//           <div key={invoice.id} className="p-4 border rounded">
//             <h3>Customer: {invoice.customer}</h3>
//             <p>Due Date: {invoice.dueDate.toLocaleDateString()}</p>
//             <p>Type: {invoice.type}</p>
//             <p>Count: {invoice.count}</p>
//             <p>Priority: {invoice.priority.name}</p>
//             <div>
//               <h4>Layers:</h4>
//               {invoice.layers.map(layer => (
//                 <div key={layer.id} className="ml-4">
//                   <p>Glass: {layer.glass.name}</p>
//                   <p>Dimensions: {layer.width}x{layer.height}</p>
//                   <p>Treatments: {layer.treatments.map(t => t.treatment.name).join(', ')}</p>
//                 </div>
//               ))}
//             </div>
//             <div>
//               <h4>Side Materials:</h4>
//               {invoice.sideMaterials.map(sm => (
//                 <div key={sm.id} className="ml-4">
//                   <p>{sm.sideMaterial.name}: {sm.quantity} units</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// } 