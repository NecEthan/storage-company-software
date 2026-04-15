export default function TopBar({ search, onSearch, onNewCustomer, activePage, onPageChange }) {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 h-12 flex items-center justify-between gap-2">
      {/* Left: Brand */}
      <div className="shrink-0">
        <span className="text-sm font-semibold text-gray-900 tracking-wide">U Store Self Storage</span>
      </div>

      {/* Center: Nav tabs */}
      <div className="flex items-center gap-1">
        <NavTab label="Dashboard" active={activePage === 'dashboard'} onClick={() => onPageChange('dashboard')} />
        <NavTab label="Site Map" active={activePage === 'sitemap'} onClick={() => onPageChange('sitemap')} />
      </div>

      {/* Right: Search + Button */}
      <div className="flex items-center gap-2 shrink-0">
        {activePage === 'dashboard' && (
          <input
            type="text"
            placeholder="Search container / customer"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="hidden md:block border border-gray-200 rounded text-xs px-3 py-1.5 outline-none bg-gray-50 focus:bg-white focus:border-gray-400 transition-colors w-48 lg:w-56"
          />
        )}
        <button className="btn-primary" onClick={onNewCustomer}>
          <span className="hidden sm:inline">+ New Customer</span>
          <span className="sm:hidden">+</span>
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
