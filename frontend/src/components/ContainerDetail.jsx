export default function ContainerDetail({ container, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end"
      style={{ background: 'rgba(0,0,0,0.18)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white h-full flex flex-col border-l border-gray-200 w-full sm:w-[420px]">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {container.unitDescription || `Container ${container.container}`}
            </h3>
            {container.block && (
              <p className="text-[11px] text-gray-400 mt-0.5">{container.block.replace(/_/g, ' ')}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">

          {/* Status bar */}
          <div className="flex items-center gap-2">
            <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded uppercase tracking-wide ${
              container.status === 'Active'
                ? 'bg-green-50 text-green-700'
                : 'bg-gray-100 text-gray-400 border border-dashed border-gray-300'
            }`}>
              {container.status}
            </span>
            {container.date && container.date !== '—' && (
              <span className="text-xs text-gray-400">Since {container.date}</span>
            )}
          </div>

          {/* Customer */}
          <Section title="Customer">
            <Field label="Name" value={container.customer} />
            <Field label="Address" value={container.address} />
            <Field label="Phone" value={container.phone} />
            <Field label="Email" value={container.email} />
          </Section>

          {/* Tenancy */}
          <Section title="Tenancy">
            <Field label="Start Date" value={container.date} />
            <Field label="Termination" value={container.terminationDate} />
            <Field label="Deposit" value={container.deposit} />
            <Field label="Access Hours" value={container.accessHours} />
          </Section>

          {/* Fees */}
          <Section title="Fees">
            <div className="grid grid-cols-3 gap-3 mb-2">
              <Field label="Ex VAT" value={container.monthlyFeeExVat ? `£${container.monthlyFeeExVat}` : ''} />
              <Field label="VAT" value={container.vatAmount ? `£${container.vatAmount}` : ''} />
              <Field label="Inc VAT" value={container.monthlyFeeIncVat ? `£${container.monthlyFeeIncVat}` : ''} />
            </div>
            <Field label="Payment Terms" value={container.paymentTerms} />
          </Section>

          {/* Insurance */}
          <Section title="Insurance">
            <Field label="Details" value={container.insuranceDisplay} />
            {container.insuranceDeclaredValue && (
              <Field label="Declared Value" value={`£${container.insuranceDeclaredValue}`} />
            )}
          </Section>

          {/* Access */}
          <Section title="Access">
            <div className="grid grid-cols-3 gap-3">
              <Field label="Padlock" value={container.padlock} />
              <Field label="Fob ID" value={container.fob} />
              <Field label="Keys Issued" value={container.keysIssued} />
            </div>
          </Section>

          {/* Notes */}
          {container.notes && (
            <Section title="Notes">
              <p className="text-xs text-gray-500 leading-relaxed">{container.notes}</p>
            </Section>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button className="btn-secondary w-full text-left">View All Documents</button>
          <button className="btn-secondary w-full text-left">View Photos</button>
          <button className="w-full border border-gray-200 rounded px-3 py-2 text-xs text-gray-500 hover:bg-gray-50 text-left transition-colors cursor-pointer">
            Print
          </button>
        </div>

      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2 pb-1 border-b border-gray-100">
        {title}
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  )
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">{label}</div>
      <div className="text-sm text-gray-800 leading-snug">{value || '—'}</div>
    </div>
  )
}
