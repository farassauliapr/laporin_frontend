import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SummaryCards from './components/SummaryCards';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';
import ReportDetail from './components/ReportDetail';

const defaultData = [
  {
    id: 1,
    nama: 'Ahmad Rizky',
    lokasi: 'Gedung A - Ruang 201',
    kategori: 'Elektronik (AC, Proyektor, Lampu)',
    deskripsi: 'AC tidak dingin dan mengeluarkan suara bising.',
    foto: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=200&auto=format&fit=crop',
    status: 'Diproses',
  },
  {
    id: 2,
    nama: 'Siti Nurhaliza',
    lokasi: 'Gedung B - Laboratorium Komputer',
    kategori: 'Mebel (Meja, Kursi, Papan Tulis)',
    deskripsi: 'Kursi lab patah pada bagian kaki kanan.',
    foto: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1270?q=80&w=200&auto=format&fit=crop',
    status: 'Telah Selesai',
  },
];

export default function App() {
  // State Navigasi
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [showSummary, setShowSummary] = useState(true);
  
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem('laporin_data');
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('laporin_data', JSON.stringify(reports));
  }, [reports]);

  const handleAddReport = (newReport) => {
    setReports([newReport, ...reports]);
    setActivePage('dashboard'); // Pindah otomatis setelah submit
  };

  const handleToggleStatus = (id) => {
    setReports(reports.map(r => r.id === id ? { ...r, status: r.status === 'Diproses' ? 'Telah Selesai' : 'Diproses' } : r));
  };

  const handleDelete = (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus laporan ini?')) {
      setReports(reports.filter((r) => r.id !== id));
    }
  };

  const handleViewDetail = (id) => {
    setSelectedReportId(id);
    setActivePage('detail');
  };

  const total = reports.length;
  const diproses = reports.filter((r) => r.status === 'Diproses').length;
  const selesai = reports.filter((r) => r.status === 'Telah Selesai').length;

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans antialiased overflow-x-hidden">
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main className="flex-grow px-4 sm:px-6 py-8 max-w-7xl mx-auto w-full">
        {activePage === 'dashboard' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Dashboard Pengaduan</h1>
                <p className="text-slate-500 mt-1">Pantau status laporan kerusakan fasilitas kampus terkini.</p>
              </div>
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer"
              >
                {showSummary ? 'Sembunyikan Ringkasan' : 'Tampilkan Ringkasan'}
              </button>
            </div>
            <SummaryCards total={total} diproses={diproses} selesai={selesai} show={showSummary} />
            <ReportList reports={reports} onViewDetail={handleViewDetail} />
          </div>
        )}

        {activePage === 'form' && (
          <div className="animate-fade-in">
            <ReportForm onAddReport={handleAddReport} />
          </div>
        )}

        {activePage === 'detail' && (
          <div className="animate-fade-in">
            <ReportDetail 
              report={reports.find(r => r.id === selectedReportId)} 
              onBack={() => setActivePage('dashboard')}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
            />
          </div>
        )}
      </main>

      <footer className="bg-slate-800 text-slate-400 py-6 text-center mt-auto border-t border-slate-700">
        <p className="text-sm">&copy; 2026 LaporIn - Telkom University</p>
      </footer>
    </div>
  );
}