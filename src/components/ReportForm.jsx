import { useState } from 'react';

export default function ReportForm({ onAddReport }) {
  const [nama, setNama] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [kategori, setKategori] = useState('Elektronik (AC, Proyektor, Lampu)');
  const [deskripsi, setDeskripsi] = useState('');
  const [fotoPreview, setFotoPreview] = useState(null);
  const [notif, setNotif] = useState(null);

  const clearError = () => {
    if (notif?.type === 'error') setNotif(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFotoPreview(imageUrl);
      clearError();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nama.trim() || !lokasi.trim() || !deskripsi.trim()) {
      setNotif({ type: 'error', message: 'Gagal! Harap lengkapi semua bidang isian.' });
      return;
    }

    onAddReport({
      id: Date.now(),
      nama,
      lokasi,
      kategori,
      deskripsi,
      // HANYA pakai foto yang di-upload. Jika tidak upload, isinya null/kosong.
      foto: fotoPreview || null,
      status: 'Diproses',
    });

    setNotif({ type: 'success', message: 'Berhasil! Laporan Anda telah terkirim.' });

    setNama('');
    setLokasi('');
    setKategori('Elektronik (AC, Proyektor, Lampu)');
    setDeskripsi('');
    setFotoPreview(null);

    setTimeout(() => {
      setNotif(null);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Formulir Laporan Baru</h2>
          <p className="text-sm text-slate-500 mt-1">Isi detail kerusakan agar teknisi dapat segera menindaklanjuti.</p>
        </div>
      </div>

      {notif && (
        <div className={`mx-6 mt-6 p-4 rounded-lg font-medium text-sm ${
          notif.type === 'error' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'
        }`}>
          {notif.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nama Pelapor</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => { setNama(e.target.value); clearError(); }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all"
              placeholder="Masukkan nama lengkap"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Lokasi Ruangan</label>
            <input
              type="text"
              value={lokasi}
              onChange={(e) => { setLokasi(e.target.value); clearError(); }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all"
              placeholder="Cth: Ruang Kelas B, Gedung 4"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Kategori Fasilitas</label>
          <select
            value={kategori}
            onChange={(e) => { setKategori(e.target.value); clearError(); }}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none bg-white"
          >
            <option>Elektronik (AC, Proyektor, Lampu)</option>
            <option>Mebel (Meja, Kursi, Papan Tulis)</option>
            <option>Sanitasi (Toilet, Wastafel)</option>
            <option>Lainnya</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi Kerusakan</label>
          <textarea
            rows="3"
            value={deskripsi}
            onChange={(e) => { setDeskripsi(e.target.value); clearError(); }}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition-all resize-none"
            placeholder="Ceritakan detail kerusakan yang terjadi..."
          ></textarea>
        </div>

        {/* Input Upload Foto */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Unggah Foto Bukti (Opsional)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:border-red-500 transition-colors bg-slate-50">
            <div className="space-y-2 text-center w-full">
              {fotoPreview ? (
                <div className="relative">
                  <img src={fotoPreview} alt="Preview Foto" className="mx-auto h-40 w-auto object-cover rounded-md border border-slate-200 shadow-sm" />
                  <button 
                    type="button" 
                    onClick={() => setFotoPreview(null)} 
                    className="mt-3 text-sm text-red-600 hover:text-red-700 font-medium cursor-pointer"
                  >
                    Hapus / Ganti Foto
                  </button>
                </div>
              ) : (
                <>
                  <svg className="mx-auto h-12 w-12 text-slate-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-slate-600 justify-center">
                    <label htmlFor="foto_bukti" className="relative cursor-pointer bg-slate-50 rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none">
                      <span>Pilih file foto</span>
                      <input id="foto_bukti" type="file" accept="image/*" className="sr-only" onChange={handleFileChange} />
                    </label>
                    <p className="pl-1">atau seret ke sini</p>
                  </div>
                  <p className="text-xs text-slate-500">PNG, JPG, JPEG up to 5MB</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-red-600 rounded-lg text-white font-medium hover:bg-red-700 shadow-sm transition-colors cursor-pointer"
          >
            Kirim Laporan
          </button>
        </div>
      </form>
    </div>
  );
}