import { useState } from 'react'

const EMPTY_FORM = {
  name: '',
  address: '',
  phone: '',
  email: '',
  container: '',
  size: '',
  startDate: '',
  price: '',
  deposit: 'None',
  accessHours: '06:00-19:00, 7 days a week',
  padlock: '',
  keys: '',
  fob: '',
  declaredValue: '',
  notes: '',
}

export default function FormPanel({ onSubmit, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [photoCount, setPhotoCount] = useState(0)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ ...form, photoCount })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <span className="text-sm font-semibold text-gray-900">Create New Customer</span>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-lg leading-none"
        >
          ×
        </button>
      </div>

      {/* Scrollable body */}
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        <form onSubmit={handleSubmit} className="p-4">

          {/* ── Customer Info ── */}
          <Field label="Customer Name">
            <input
              type="text"
              value={form.name}
              onChange={update('name')}
              placeholder="e.g. John Doe"
              required
              autoFocus
              className="field-input"
            />
          </Field>
          <Field label="Address">
            <input
              type="text"
              value={form.address}
              onChange={update('address')}
              placeholder="e.g. 12 High Street, Camberley, GU15 1AB"
              className="field-input"
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Phone Number">
              <input
                type="tel"
                value={form.phone}
                onChange={update('phone')}
                placeholder="e.g. 07700 900 123"
                className="field-input"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                placeholder="e.g. john@example.com"
                className="field-input"
              />
            </Field>
          </div>

          <Divider />

          {/* ── Container Info ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Container Number">
              <select value={form.container} onChange={update('container')} className="field-input">
                <option value="">Select...</option>
                <option value="A001">A001</option>
                <option value="A002">A002</option>
                <option value="A003">A003</option>
              </select>
            </Field>
            <Field label="Container Size">
              <select value={form.size} onChange={update('size')} className="field-input">
                <option value="">Select...</option>
                <option value="20ft">20ft</option>
                <option value="40ft">40ft</option>
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Start Date">
              <input
                type="date"
                value={form.startDate}
                onChange={update('startDate')}
                className="field-input"
              />
            </Field>
            <Field label="Monthly Price (ex VAT)">
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none pointer-events-none">
                  £
                </span>
                <input
                  type="number"
                  value={form.price}
                  onChange={update('price')}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className="field-input pl-6"
                />
              </div>
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Deposit">
              <input
                type="text"
                value={form.deposit}
                onChange={update('deposit')}
                placeholder="e.g. None"
                className="field-input"
              />
            </Field>
            <Field label="Access Hours">
              <input
                type="text"
                value={form.accessHours}
                onChange={update('accessHours')}
                placeholder="e.g. 06:00-19:00, 7 days"
                className="field-input"
              />
            </Field>
          </div>

          <Divider />

          {/* ── Access Info ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Padlock Number">
              <input
                type="text"
                value={form.padlock}
                onChange={update('padlock')}
                placeholder="e.g. PL-042"
                className="field-input"
              />
            </Field>
            <Field label="Number of Keys">
              <input
                type="number"
                value={form.keys}
                onChange={update('keys')}
                placeholder="2"
                min="0"
                className="field-input"
              />
            </Field>
          </div>
          <Field label="Fob ID">
            <input
              type="text"
              value={form.fob}
              onChange={update('fob')}
              placeholder="e.g. FOB-19A"
              className="field-input"
            />
          </Field>

          <Divider />

          {/* ── Insurance ── */}
          <Field label="Declared Value of Goods">
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none pointer-events-none">
                £
              </span>
              <input
                type="number"
                value={form.declaredValue}
                onChange={update('declaredValue')}
                placeholder="0"
                min="0"
                className="field-input pl-6"
              />
            </div>
          </Field>

          <Divider />

          {/* ── Notes & Photos ── */}
          <Field label="Notes">
            <textarea
              value={form.notes}
              onChange={update('notes')}
              placeholder="Any additional notes..."
              rows={3}
              className="field-input resize-y"
            />
          </Field>

          <Field label="Photos">
            <label className="inline-flex items-center gap-2 border border-dashed border-gray-300 rounded px-3 py-2 text-xs text-gray-500 hover:border-gray-400 hover:text-gray-700 cursor-pointer transition-colors">
              Upload Photos
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => setPhotoCount(e.target.files.length)}
              />
            </label>
            {photoCount > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                {photoCount} photo{photoCount !== 1 ? 's' : ''} selected
              </p>
            )}
          </Field>

          {/* ── Submit ── */}
          <div className="pt-4 mt-1 border-t border-gray-100">
            <button type="submit" className="btn-primary w-full py-2.5">
              Create Customer
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className="mb-3">
      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">
        {label}
      </label>
      {children}
    </div>
  )
}

function Divider() {
  return <hr className="border-gray-100 my-4" />
}
