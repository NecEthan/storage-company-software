export default function TopBar({ search, onSearch, onNewCustomer, activePage, onPageChange }) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 h-12 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center gap-2.5" style={{ minWidth: 180 }}>
        <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center text-white text-xs font-bold tracking-tight select-none">
          SC
        </div>
        <div className="text-xs text-gray-400 leading-tight">
          Storage Co.
          <br />
          Management
        </div>
      </div>

      {/* Center: Nav tabs */}
      <div className="flex items-center gap-1">
        <NavTab label="Dashboard" active={activePage === 'dashboard'} onClick={() => onPageChange('dashboard')} />
        <NavTab label="Site Map" active={activePage === 'sitemap'} onClick={() => onPageChange('sitemap')} />
      </div>

      {/* Right: Search + Button */}
      <div className="flex items-center gap-2" style={{ minWidth: 180, justifyContent: 'flex-end' }}>
        {activePage === 'dashboard' && (
          <input
            type="text"
            placeholder="Search Container / Customer"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="border border-gray-200 rounded text-xs px-3 py-1.5 outline-none bg-gray-50 focus:bg-white focus:border-gray-400 transition-colors"
            style={{ width: 220 }}
          />
        )}
        <button className="btn-primary" onClick={onNewCustomer}>
          + New Customer
        </button>
      </div>
    </div>
  )
}

function NavTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
        active
          ? 'bg-gray-900 text-white'
          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  )
}
