import { useState, useEffect } from 'react';

export default function TechnicianList() {
  // State untuk menyimpan data, status loading, dan pesan error
  const [technicians, setTechnicians] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fungsi asinkron untuk mengambil data dari API
  const fetchTechnicians = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Endpoint API JSONPlaceholder
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error('Gagal terhubung ke server teknisi.');
      }
      
      const data = await response.json();
      // Mengambil 4 data pertama saja untuk contoh teknisi
      setTechnicians(data.slice(0, 4));
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan jaringan.');
    } finally {
      setIsLoading(false);
    }
  };

  // Memanggil fungsi fetch saat komponen pertama kali dirender
  useEffect(() => {
    fetchTechnicians();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <h2 className="text-lg font-semibold text-slate-800">Daftar Teknisi Siaga</h2>
      </div>
      
      <div className="p-6">
        {/* KONDISI 1: LOADING */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-6 text-slate-500">
            <svg className="animate-spin h-8 w-8 text-red-600 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="font-medium">Memuat data teknisi...</p>
          </div>
        )}

        {/* KONDISI 2: ERROR */}
        {!isLoading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-6 rounded-lg text-center">
            <p className="font-semibold mb-3">Oops! {error}</p>
            {/* Tombol Coba Lagi sesuai instruksi tugas */}
            <button 
              onClick={fetchTechnicians}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors cursor-pointer"
            >
              &#x21bb; Coba Lagi
            </button>
          </div>
        )}

        {/* KONDISI 3: SUCCESS (Menampilkan render list .map) */}
        {!isLoading && !error && technicians.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {technicians.map((tech) => (
              <div key={tech.id} className="border border-slate-200 rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <h3 className="font-bold text-slate-800 text-sm">{tech.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{tech.email}</p>
                <span className="mt-3 text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded border border-green-200 font-semibold">Tersedia</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}