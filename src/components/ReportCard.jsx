export default function ReportCard({ item, index, onViewDetail }) {
  const isSelesai = item.status === 'Telah Selesai';

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4 font-medium text-slate-900">{index + 1}</td>
      <td className="px-6 py-4">
        <img src={item.foto} alt="Bukti" className="w-16 h-16 object-cover rounded-lg border border-slate-200 shadow-sm" />
      </td>
      <td className="px-6 py-4">
        <div className="font-semibold text-slate-800">{item.lokasi}</div>
        <div className="text-xs text-slate-500 mt-0.5">
          {item.kategori} • <span className="font-medium">{item.nama}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${
            isSelesai ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'
        }`}>
          {item.status}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <button
          onClick={() => onViewDetail(item.id)}
          className="text-sm text-red-600 hover:text-red-800 font-semibold transition-colors cursor-pointer"
        >
          Lihat Detail &rarr;
        </button>
      </td>
    </tr>
  );
}