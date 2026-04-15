import { useState } from 'react'
import TopBar from './components/TopBar'
import FormPanel from './components/FormPanel'
import OutputPanel from './components/OutputPanel'
import TableDashboard from './components/TableDashboard'
import ContainerDetail from './components/ContainerDetail'
import SiteMap from './components/SiteMap'
import mockData from './data/mockData.json'

function formatDate(iso) {
  if (!iso) return '—'
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
}

const INITIAL_ROWS = mockData.records.map((r, i) => ({
  id: i + 1,
  container: r.unit_number,
  customer: r.customer_name ?? '',
  date: formatDate(r.commencement_date),
  status: r.status === 'active' ? 'Active' : 'Empty',
  hasDocs: !!r.customer_name,
  // contact
  phone: r.customer_phone ?? '',
  email: r.customer_email ?? '',
  address: r.customer_address ?? '',
  // unit
  floor: r.floor ?? '',
  block: r.block ?? '',
  unitDescription: r.unit_description ?? '',
  // tenancy
  terminationDate: r.termination_date ?? '',
  deposit: r.deposit ?? '',
  accessHours: r.access_hours ?? '',
  // fees
  monthlyFeeExVat: r.fees?.monthly_fee_ex_vat ?? '',
  vatAmount: r.fees?.vat_amount ?? '',
  monthlyFeeIncVat: r.fees?.monthly_fee_inc_vat ?? '',
  paymentTerms: r.fees?.payment_terms ?? '',
  // insurance
  insuranceDeclaredValue: r.insurance?.declared_value_of_goods ?? '',
  insuranceDisplay: r.insurance?.display ?? '',
  // access
  padlock: r.padlock_fobs?.padlock_number ?? '',
  fob: r.padlock_fobs?.fob_id ?? '',
  keysIssued: r.padlock_fobs?.keys_issued ?? '',
  // misc
  notes: r.notes ?? '',
}))

export default function App() {
  const [showForm, setShowForm] = useState(false)
  const [rows, setRows] = useState(INITIAL_ROWS)
  const [selectedContainer, setSelectedContainer] = useState(null)
  const [created, setCreated] = useState(false)
  const [createdData, setCreatedData] = useState(null)
  const [search, setSearch] = useState('')
  const [activePage, setActivePage] = useState('dashboard')

  const handleNewCustomer = () => {
    setShowForm(true)
    setCreated(false)
    setCreatedData(null)
  }

  const handleCreate = (formData) => {
    const displayDate = formData.startDate
      ? new Date(formData.startDate + 'T00:00:00').toLocaleDateString('en-GB', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        })
      : '—'

    const newRow = {
      id: Date.now(),
      container: formData.container || '—',
      customer: formData.name,
      date: displayDate,
      status: 'Active',
      hasDocs: true,
      phone: formData.phone,
      email: formData.email,
      padlock: formData.padlock,
      fob: formData.fob,
    }

    setRows((prev) =>
      prev.some((r) => r.container === newRow.container)
        ? prev.map((r) => (r.container === newRow.container ? newRow : r))
        : [...prev, newRow]
    )
    setCreatedData({ ...formData, displayDate })
    setCreated(true)
  }

  const handleSaveExit = () => {
    setShowForm(false)
    setCreated(false)
    setCreatedData(null)
  }

  const filteredRows = search
    ? rows.filter(
        (r) =>
          r.container.toLowerCase().includes(search.toLowerCase()) ||
          r.customer.toLowerCase().includes(search.toLowerCase())
      )
    : rows

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        search={search}
        onSearch={setSearch}
        onNewCustomer={handleNewCustomer}
        activePage={activePage}
        onPageChange={setActivePage}
      />

      <div className="max-w-screen-xl mx-auto px-4 py-4 space-y-4">
        {activePage === 'dashboard' && (
          <>
            {showForm && (
              <div
                className="grid gap-4 items-start"
                style={{ gridTemplateColumns: '420px 1fr' }}
              >
                <FormPanel onSubmit={handleCreate} onClose={handleSaveExit} />
                <OutputPanel
                  created={created}
                  data={createdData}
                  onSaveExit={handleSaveExit}
                />
              </div>
            )}

            <TableDashboard
              rows={filteredRows}
              onRowClick={setSelectedContainer}
              onAddClick={handleNewCustomer}
            />
          </>
        )}

        {activePage === 'sitemap' && (
          <SiteMap
            rows={rows}
            onContainerClick={setSelectedContainer}
            onAddClick={handleNewCustomer}
          />
        )}
      </div>

      {selectedContainer && (
        <ContainerDetail
          container={selectedContainer}
          onClose={() => setSelectedContainer(null)}
        />
      )}
    </div>
  )
}
