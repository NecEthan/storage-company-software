export default function TableDashboard({ rows, onRowClick, onAddClick }) {
  const activeCount = rows.filter((r) => r.status === 'Active').length
  const emptyCount = rows.filter((r) => r.status === 'Empty').length

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Table header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900">Containers</h2>
        <span className="text-xs text-gray-400">
          {rows.length} container{rows.length !== 1 ? 's' : ''} &mdash; {activeCount} active
          {emptyCount > 0 && `, ${emptyCount} empty`}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Container</th>
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Customer</th>
              <th className="hidden sm:table-cell text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Start Date</th>
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
              <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <Row
                key={row.id ?? i}
                row={row}
                onRowClick={onRowClick}
                onAddClick={onAddClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Row({ row, onRowClick, onAddClick }) {
  const isEmpty = row.status === 'Empty'

  return (
    <tr
      onClick={() => (isEmpty ? onAddClick() : onRowClick(row))}
      className={`border-b border-gray-100 last:border-0 cursor-pointer transition-colors ${
        isEmpty ? 'hover:bg-gray-50' : 'hover:bg-blue-50'
      }`}
    >
      {/* Container */}
      <td className="px-4 py-3 font-mono text-xs font-semibold text-gray-700 whitespace-nowrap">
        {row.container}
      </td>

      {/* Customer */}
      <td className="px-4 py-3 text-gray-700">
        {isEmpty ? (
          <span className="text-gray-400 italic">EMPTY</span>
        ) : (
          row.customer
        )}
      </td>

      {/* Date — hidden on mobile */}
      <td className="hidden sm:table-cell px-4 py-3 text-gray-500 tabular-nums whitespace-nowrap">
        {row.date}
      </td>

      {/* Status */}
      <td className="px-4 py-3 whitespace-nowrap">
        {row.status === 'Active' ? (
          <span className="inline-block bg-green-50 text-green-700 text-[11px] font-semibold px-2 py-0.5 rounded uppercase tracking-wide">
            Active
          </span>
        ) : (
          <span className="inline-block bg-gray-100 text-gray-400 text-[11px] font-semibold px-2 py-0.5 rounded border border-dashed border-gray-300 uppercase tracking-wide">
            Empty
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="px-4 py-3 whitespace-nowrap">
        {isEmpty ? (
          <button
            onClick={(e) => { e.stopPropagation(); onAddClick() }}
            className="border border-dashed border-gray-300 rounded px-3 py-1 text-xs text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
          >
            + Add
          </button>
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); onRowClick(row) }}
            className="border border-gray-200 rounded px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            View
          </button>
        )}
      </td>
    </tr>
  )
}
