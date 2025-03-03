
type Column = {
  key: string
  label: string
  render?: (value: any) => React.ReactNode
}

type DynamicTableProps = {
  columns: Column[]
  data: any[]
}

export default function DynamicTable({ columns, data }: DynamicTableProps) {
  return (
    <div className="mt-8 -mx-4 sm:mx-0 overflow-hidden shadow ring-1 ring-black ring-opacity-5">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-3 py-3.5 sm:px-6 text-right text-sm font-semibold text-gray-900"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="whitespace-nowrap px-3 py-4 sm:px-6 text-sm text-gray-500"
                  >
                    {column.render ? column.render(row[column.key]) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
