import { prisma } from '@/lib/db'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'

export async function GlassList() {
  const glasses = await prisma.glass.findMany({
  
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <h2>Glasses</h2>
      <div className="grid gap-4">
        {glasses.map((glass: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; code: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; sellPrice: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined }) => (
          <div key={glass.id} className="p-4 border rounded">
            <h3>{glass.name}</h3>
            <p>Code: {glass.code}</p>
            <p>Price: ${glass.sellPrice}</p>
          </div>
        ))}
      </div>
    </div>
  )
} 