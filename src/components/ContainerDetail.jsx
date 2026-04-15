const FIELDS = [
  { label: 'Customer Name', key: 'customer' },
  { label: 'Phone', key: 'phone' },
  { label: 'Email', key: 'email' },
  { label: 'Padlock', key: 'padlock' },
  { label: 'Fob ID', key: 'fob' },
]

export default function ContainerDetail({ container, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end"
      style={{ background: 'rgba(0,0,0,0.18)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white h-full flex flex-col border-l border-gray-200" style={{ width: 380 }}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 bg-white">
          <h3 className="text-sm font-semibold text-gray-900">
            Container {container.container}
          </h3>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="p-4 flex-1 overflow-y-auto">
          {/* Status + date */}
          <div className="flex items-center gap-2 mb-5">
            <span
              className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded uppercase tracking-wide ${
                container.status === 'Active'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-gray-100 text-gray-400 border border-dashed border-gray-300'
              }`}
            >
              {container.status}
            </span>
            {container.date && container.date !== '—' && (
              <span className="text-xs text-gray-400">Since {container.date}</span>
            )}
          </div>

          {/* Fields */}
          {FIELDS.map(({ label, key }) => (
            <div key={key} className="mb-4">
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
                {label}
              </div>
              <div className="text-sm text-gray-800">{container[key] || '—'}</div>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button className="btn-secondary w-full text-left">
            View All Documents
          </button>
          <button className="btn-secondary w-full text-left">
            View Photos
          </button>
          <button className="w-full border border-gray-200 rounded px-3 py-2 text-xs text-gray-500 hover:bg-gray-50 text-left transition-colors cursor-pointer">
            Print
          </button>
        </div>

      </div>
    </div>
  )
}
