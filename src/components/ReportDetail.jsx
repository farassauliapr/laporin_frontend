export default function ReportDetail({ report, onBack, onToggleStatus, onDelete }) {
  if (!report) return null;
  const isSelesai = report.status === 'Telah Selesai';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      {/* Header Detail */}
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-800">Detail Pengaduan</h2>
        <button 
          onClick={onBack} 
          className="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1"
        >
          &larr; Kembali ke Dashboard
        </button>
      </div>

      {/* Konten Utama */}
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          
          {/* Sisi Kiri: Gambar */}
          <div className="w-full h-auto max-h-[400px] overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-slate-100">
            <img 
              src={report.foto} 
              alt="Bukti Laporan" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Sisi Kanan: Informasi */}
          <div className="flex flex-col justify-start gap-5">
            
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Lokasi / Ruangan</h3>
              <p className="text-2xl font-bold text-slate-900">{report.lokasi}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Nama Pelapor</h3>
                <p className="text-base font-medium text-slate-800">{report.nama}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status Laporan</h3>
                <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full border ${
                  isSelesai ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                }`}>
                  {report.status}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Kategori Fasilitas</h3>
              <p className="text-base text-slate-800 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg inline-block">
                {report.kategori}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Deskripsi Kerusakan</h3>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed text-sm">
                {report.deskripsi}
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="pt-4 flex flex-wrap gap-3 border-t border-slate-100 mt-2">
              <button
                onClick={() => onToggleStatus(report.id)}
                className={`px-5 py-2.5 rounded-lg font-medium text-white shadow-sm transition-colors cursor-pointer text-sm ${
                  isSelesai ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isSelesai ? 'Tandai Diproses' : 'Tandai Selesai'}
              </button>
              <button
                onClick={() => {
                  onDelete(report.id);
                  onBack(); // Otomatis kembali setelah dihapus
                }}
                className="px-5 py-2.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 rounded-lg font-medium transition-colors cursor-pointer text-sm"
              >
                Hapus Laporan
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}