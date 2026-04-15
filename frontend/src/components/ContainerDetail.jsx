import { useEffect, useState } from 'react'

export default function ContainerDetail({ container, onClose, onSave }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(container)

  useEffect(() => {
    setDraft(container)
    setIsEditing(false)
  }, [container])

  const updateField = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    onSave?.(draft)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setDraft(container)
    setIsEditing(false)
  }

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
              {draft.unitDescription || `Container ${draft.container}`}
            </h3>
            {draft.block && (
              <p className="text-[11px] text-gray-400 mt-0.5">{draft.block.replace(/_/g, ' ')}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="border border-gray-200 rounded px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="border border-gray-200 rounded px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-gray-900 text-white rounded px-3 py-1 text-xs font-semibold hover:bg-gray-700 transition-colors"
                >
                  Save
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-lg leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">

          {/* Status bar */}
          <div className="flex items-center gap-2">
            <span className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded uppercase tracking-wide ${
              draft.status === 'Active'
                ? 'bg-green-50 text-green-700'
                : 'bg-gray-100 text-gray-400 border border-dashed border-gray-300'
            }`}>
              {draft.status}
            </span>
            {draft.date && draft.date !== '—' && (
              <span className="text-xs text-gray-400">Since {draft.date}</span>
            )}
          </div>

          {/* Customer */}
          <Section title="Customer">
            <Field label="Name" value={draft.customer} editable={isEditing} onChange={(v) => updateField('customer', v)} />
            <Field label="Address" value={draft.address} editable={isEditing} multiline onChange={(v) => updateField('address', v)} />
            <Field label="Phone" value={draft.phone} editable={isEditing} onChange={(v) => updateField('phone', v)} />
            <Field label="Email" value={draft.email} editable={isEditing} onChange={(v) => updateField('email', v)} />
          </Section>

          {/* Tenancy */}
          <Section title="Tenancy">
            <Field label="Start Date" value={draft.date} editable={isEditing} onChange={(v) => updateField('date', v)} />
            <Field label="Termination" value={draft.terminationDate} editable={isEditing} multiline onChange={(v) => updateField('terminationDate', v)} />
            <Field label="Deposit" value={draft.deposit} editable={isEditing} onChange={(v) => updateField('deposit', v)} />
            <Field label="Access Hours" value={draft.accessHours} editable={isEditing} onChange={(v) => updateField('accessHours', v)} />
          </Section>

          {/* Fees */}
          <Section title="Fees">
            <div className="grid grid-cols-3 gap-3 mb-2">
              <Field
                label="Ex VAT"
                value={isEditing ? draft.monthlyFeeExVat : (draft.monthlyFeeExVat ? `£${draft.monthlyFeeExVat}` : '')}
                editable={isEditing}
                onChange={(v) => updateField('monthlyFeeExVat', v)}
              />
              <Field
                label="VAT"
                value={isEditing ? draft.vatAmount : (draft.vatAmount ? `£${draft.vatAmount}` : '')}
                editable={isEditing}
                onChange={(v) => updateField('vatAmount', v)}
              />
              <Field
                label="Inc VAT"
                value={isEditing ? draft.monthlyFeeIncVat : (draft.monthlyFeeIncVat ? `£${draft.monthlyFeeIncVat}` : '')}
                editable={isEditing}
                onChange={(v) => updateField('monthlyFeeIncVat', v)}
              />
            </div>
            <Field label="Payment Terms" value={draft.paymentTerms} editable={isEditing} multiline onChange={(v) => updateField('paymentTerms', v)} />
          </Section>

          {/* Insurance */}
          <Section title="Insurance">
            <Field label="Details" value={draft.insuranceDisplay} editable={isEditing} multiline onChange={(v) => updateField('insuranceDisplay', v)} />
            {(draft.insuranceDeclaredValue || isEditing) && (
              <Field
                label="Declared Value"
                value={isEditing ? draft.insuranceDeclaredValue : `£${draft.insuranceDeclaredValue}`}
                editable={isEditing}
                onChange={(v) => updateField('insuranceDeclaredValue', v)}
              />
            )}
          </Section>

          {/* Access */}
          <Section title="Access">
            <div className="grid grid-cols-3 gap-3">
              <Field label="Padlock" value={draft.padlock} editable={isEditing} onChange={(v) => updateField('padlock', v)} />
              <Field label="Fob ID" value={draft.fob} editable={isEditing} onChange={(v) => updateField('fob', v)} />
              <Field label="Keys Issued" value={draft.keysIssued} editable={isEditing} onChange={(v) => updateField('keysIssued', v)} />
            </div>
          </Section>

          {/* Notes */}
          {(draft.notes || isEditing) && (
            <Section title="Notes">
              <Field label="" value={draft.notes} editable={isEditing} multiline onChange={(v) => updateField('notes', v)} />
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

function Field({ label, value, editable = false, onChange, multiline = false }) {
  const hasLabel = !!label

  return (
    <div>
      {hasLabel && <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">{label}</div>}
      {editable ? (
        multiline ? (
          <textarea
            value={value ?? ''}
            onChange={(e) => onChange?.(e.target.value)}
            rows={3}
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm text-gray-800 outline-none focus:border-gray-500 resize-y"
          />
        ) : (
          <input
            type="text"
            value={value ?? ''}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm text-gray-800 outline-none focus:border-gray-500"
          />
        )
      ) : (
        <div className="text-sm text-gray-800 leading-snug">{value || '—'}</div>
      )}
    </div>
  )
}
