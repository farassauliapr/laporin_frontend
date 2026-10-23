import ReportCard from './ReportCard';

export default function ReportList({ reports, onViewDetail }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-800">Daftar Laporan Fasilitas Rusak</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-200 text-sm uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4 font-medium">No</th>
              <th className="px-6 py-4 font-medium">Foto</th>
              <th className="px-6 py-4 font-medium">Ruangan / Lokasi</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 text-sm divide-y divide-slate-100">
            {reports.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-400 text-base">
                  Belum ada laporan kerusakan yang terdaftar.
                </td>
              </tr>
            ) : (
              reports.map((item, index) => (
                <ReportCard key={item.id} item={item} index={index} onViewDetail={onViewDetail} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}