// import { prisma } from '@/lib/db'

// interface Glass {
//   id: string
//   name: string
//   code: string
//   sellPrice: number
// }

// export async function GlassList() {
//   const glasses = await prisma.glass.findMany({
//     orderBy: { createdAt: 'desc' }
//   })

//   return (
//     <div>
//       <h2>Glasses</h2>
//       <div className="grid gap-4">
//         {glasses.map((glass: Glass) => (
//           <div key={glass.id} className="p-4 border rounded">
//             <h3>{glass.name}</h3>
//             <p>Code: {glass.code}</p>
//             <p>Price: ${glass.sellPrice}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// } 