// import { prisma } from '@/lib/db'

// export async function SoldProductList() {
//   const soldProducts = await prisma.soldProduct.findMany({
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
//       <h2>Sold Products</h2>
//       <div className="grid gap-4">
//         {soldProducts.map(product => (
//           <div key={product.id} className="p-4 border rounded">
//             <h3>Customer: {product.customer}</h3>
//             <p>Due Date: {product.dueDate.toLocaleDateString()}</p>
//             <p>Type: {product.type}</p>
//             <p>Count: {product.count}</p>
//             <div>
//               <h4>Layers:</h4>
//               {product.layers.map(layer => (
//                 <div key={layer.id} className="ml-4">
//                   <p>Glass: {layer.glass.name}</p>
//                   <p>Dimensions: {layer.width}x{layer.height}</p>
//                   <p>Treatments: {layer.treatments.map(t => t.treatment.name).join(', ')}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// } 