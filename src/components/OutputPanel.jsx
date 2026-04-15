const DOCS = [
  'Contract Generated',
  'Cover Sheet Generated',
  'Insurance Form Generated',
  'Key Release Form Generated',
]

export default function OutputPanel({ created, data, onSaveExit }) {
  if (!created) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-300 min-h-52">
        <span className="text-xs">Documents will appear here after creating a customer.</span>
      </div>
    )
  }

  const subtitle = [
    data?.name,
    data?.container && `Container ${data.container}`,
    data?.size,
    data?.price && `£${parseFloat(data.price).toFixed(2)}/mo`,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-bold flex-shrink-0">
            ✓
          </div>
          <span className="text-sm font-semibold text-gray-900">
            Customer Created Successfully
          </span>
        </div>
        {subtitle && (
          <p className="text-xs text-gray-400 mt-1 ml-8">{subtitle}</p>
        )}
      </div>

      <div className="p-4">
        {/* Checklist */}
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
          Generated Documents
        </p>
        <ul className="border border-gray-100 rounded-lg overflow-hidden mb-5">
          {DOCS.map((doc, i) => (
            <li
              key={i}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 ${
                i < DOCS.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center text-white text-[10px] flex-shrink-0">
                ✓
              </span>
              {doc}
            </li>
          ))}
        </ul>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button className="btn-secondary text-left">View Contract</button>
          <button className="btn-secondary text-left">Send for Signature</button>
          <button className="btn-secondary text-left">Print Documents</button>
          <button className="btn-secondary text-left">Download All</button>
        </div>

        <button
          onClick={onSaveExit}
          className="btn-primary w-full py-2.5 text-center"
        >
          Save &amp; Exit
        </button>
      </div>
    </div>
  )
}
