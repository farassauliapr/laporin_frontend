export default function Navbar({ activePage, setActivePage }) {
  return (
    <nav className="relative bg-cover bg-center text-white shadow-lg sticky top-0 z-50 flex-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop')" }}>
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 to-slate-900/70"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActivePage('dashboard')}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
            <span className="font-bold text-xl tracking-wide">LaporIn</span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setActivePage('dashboard')} 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${activePage === 'dashboard' ? 'bg-white/20 border border-white/50 shadow-sm' : 'hover:bg-white/10'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActivePage('form')} 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all cursor-pointer ${activePage === 'form' ? 'bg-white/20 border border-white/50 shadow-sm' : 'hover:bg-white/10'}`}
            >
              Buat Laporan
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}