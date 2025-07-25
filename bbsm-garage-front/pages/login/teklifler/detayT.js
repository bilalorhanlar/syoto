import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import Link from "next/link";
import { useLoading } from '../../_app';
import withAuth from '../../../withAuth';
import { useAuth } from '../../../auth-context';

export default function Detay() {
  const { fetchWithAuth } = useAuth();
  const { loading, setLoading } = useLoading();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [detay_id, setDetay_id] = useState(0);
  const [veri, setVeri] = useState({});
  const [adSoyad, setadSoyad] = useState('');
  const [telNo, settelNo] = useState('');
  const [markaModel, setmarkaModel] = useState('');
  const [plaka, setplaka] = useState('');
  const [km, setkm] = useState('');
  const [modelYili, setmodelYili] = useState('');
  const [sasi, setsasi] = useState('');
  const [renk, setrenk] = useState('');
  const [girisTarihi, setgirisTarihi] = useState('');
  const [notlar, setnotlar] = useState('');
  const [adres, setadres] = useState('');
  const [yapilanlar, setYapilanlar] = useState([]);
  const [toplamFiyat, setToplamFiyat] = useState(0);

  const handleChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case 'adSoyad':
        setadSoyad(value);
        break;
      case 'telNo':
        settelNo(value);
        break;
      case 'markaModel':
        setmarkaModel(value);
        break;
      case 'plaka':
        setplaka(value);
        break;
      case 'km':
        setkm(value);
        break;
      case 'modelYili':
        setmodelYili(value);
        break;
      case 'sasi':
        setsasi(value);
        break;
      case 'renk':
        setrenk(value);
        break;
      case 'girisTarihi':
        setgirisTarihi(value);
        break;
      case 'notlar':
        setnotlar(value);
        break;
      case 'adres':
        setadres(value);
        break;
    }
  };

  const router = useRouter();
  const { id } = router.query;

  async function fetchData(teklif_id) {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`https://syoto-garage.up.railway.app/teklif/${teklif_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setVeri(data);
      setYapilanlar(data.yapilanlar || []);
      setadSoyad(data.adSoyad || '');
      settelNo(data.telNo || '');
      setmarkaModel(data.markaModel || '');
      setplaka(data.plaka || '');
      setkm(data.km || '');
      setmodelYili(data.modelYili || '');
      setsasi(data.sasi || '');
      setrenk(data.renk || '');
      setgirisTarihi(data.girisTarihi || '');
      setnotlar(data.notlar || '');
      setadres(data.adres || '');
    } catch (error) {
      console.error('Fetch data error:', error);
    }
    setLoading(false);
  };

  const handleChange2 = (event, index) => {
    const { name, value } = event.target;
    const updatedYapilanlar = [...yapilanlar];
    updatedYapilanlar[index] = { ...updatedYapilanlar[index], [name]: value };
    setYapilanlar(updatedYapilanlar);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`https://syoto-garage.up.railway.app/yapilanlar/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setYapilanlar(yapilanlar.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Delete yapilan error:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const toplam = yapilanlar.reduce((acc, item) => {
      const birimFiyati = parseFloat(item.birimFiyati) || 0;
      const birimAdedi = parseInt(item.birimAdedi, 10) || 0;
      return acc + (birimFiyati * birimAdedi);
    }, 0);
    setToplamFiyat(toplam);
  }, [yapilanlar]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const test = () => {
    if (id !== undefined) {
      setDetay_id(id);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id).then(() => {
          test();
        });
    }
  }, [id]);

  const handleSaveCardInfo = async () => {
    setLoading(true);
    const dataToSend = {
      adSoyad,
      telNo,
      markaModel,
      plaka,
      km: parseInt(km, 10) || null,
      modelYili: parseInt(modelYili, 10) || null,
      sasi,
      renk,
      girisTarihi,
      notlar,
      adres,
    };
  
    try {
      const response = await fetchWithAuth(`https://syoto-garage.up.railway.app/teklif/${detay_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const updatedCard = await response.json();
      setVeri(updatedCard);
      setadSoyad(updatedCard.adSoyad || '');
      settelNo(updatedCard.telNo || '');
      setmarkaModel(updatedCard.markaModel || '');
      setplaka(updatedCard.plaka || '');
      setkm(updatedCard.km || '');
      setmodelYili(updatedCard.modelYili || '');
      setsasi(updatedCard.sasi || '');
      setrenk(updatedCard.renk || '');
      setgirisTarihi(updatedCard.girisTarihi || '');
      setnotlar(updatedCard.notlar || '');
      setadres(updatedCard.adres || '');
    } catch (error) {
      console.error('Save teklif info error:', error);
    }
    setLoading(false);
  };
  

  const handleSaveYapilanlar = async () => {
    setLoading(true);
    const dataToSend = yapilanlar.map(yapilan => ({
      id: yapilan.id,
      birimAdedi: parseInt(yapilan.birimAdedi, 10) || null,
      birimFiyati: parseFloat(yapilan.birimFiyati) || null,
      parcaAdi: yapilan.parcaAdi,
      toplamFiyat: yapilan.toplamFiyat,
    }));
  
    try {
      const response = await fetchWithAuth(`https://syoto-garage.up.railway.app/teklif/${detay_id}/yapilanlar`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const updatedCard = await response.json();
      setVeri(updatedCard);
      setYapilanlar(updatedCard.yapilanlar || []);
    } catch (error) {
      console.error('Save yapilanlar error:', error);
    }
    setLoading(false);
  };
  

  const handleEkleYapilanlar = () => {
    setLoading(true);
    const yeniYapilan = {
      birimAdedi: '1',
      parcaAdi: '',
      birimFiyati: '1',
      toplamFiyat: 0,
    };
    setYapilanlar([...yapilanlar, yeniYapilan]);
    setLoading(false);
  };

  const handleExcelDownload = async () => {
    setLoading(true);
    const dataToSend = {
      vehicleInfo: {
        adSoyad: adSoyad || '',
        telNo: telNo || '',
        markaModel: markaModel || '',
        plaka: plaka || '',
        km: km || '',
        modelYili: modelYili || '',
        sasi: sasi || '',
        renk: renk || '',
        girisTarihi: girisTarihi || '',
        notlar: notlar || '',
        adres: adres || '',
      },
      data: yapilanlar.map(item => ({
        birimAdedi: parseInt(item.birimAdedi) || 0,
        parcaAdi: item.parcaAdi || '',
        birimFiyati: parseFloat(item.birimFiyati) || 0,
        toplamFiyat: (parseFloat(item.birimFiyati) || 0) * (parseInt(item.birimAdedi) || 0),
      })),
      notes: notlar || ''
    };

    try {
      const response = await fetch('https://syoto-garage.up.railway.app/excel/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'output.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Excel download error:', error);
      // Show error message to user
      alert('Excel dosyası indirilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
    setLoading(false);
  };

  const handlePDFDownload = async () => {
    setLoading(true);
    const dataToSend = {
        vehicleInfo: {
            adSoyad,
            telNo,
            markaModel,
            plaka,
            km,
            modelYili,
            sasi,
            renk,
            girisTarihi,
            notlar,
            adres,
        },
        data: yapilanlar.map(item => ({
            birimAdedi: item.birimAdedi,
            parcaAdi: item.parcaAdi,
            birimFiyati: item.birimFiyati,
            toplamFiyat: item.birimFiyati * item.birimAdedi,
        })),
        notes: notlar
    };

    try {
        const response = await fetch('https://syoto-garage.up.railway.app/excel/pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'output.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('PDF download error:', error);
    }
    setLoading(false);
};

  return (
    <>
      <Head>
        <title>BBSM Garage - Kart Detay</title>
        <link rel="icon" href="/BBSM.ico" />
      </Head>

      <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 lg:translate-x-0`} aria-label="Sidebar">
        <div className="h-full px-4 pt-6 pb-4 text-center overflow-y-auto bg-my-beyaz">
          <ul className="space-y-4">
            <li>
              <Link href="/login/kartlar" className="block p-2 font-medium text-md text-my-açıkgri focus:border-2 focus:border-my-açıkgri focus:font-bold focus:text-my-4b4b4bgri bg-my-ebbeyaz rounded-xl hover:text-my-beyaz hover:bg-my-siyah group">Kartlar</Link>
            </li>
            <li>
              <Link href="/login/teklif" className="block p-2 text-md border-2 border-my-açıkgri font-bold text-my-4b4b4bgri bg-my-ebbeyaz rounded-xl hover:text-my-beyaz hover:bg-my-siyah group">Teklif</Link>
            </li>
            <li>
              <Link href="/login/stok" className="block p-2 font-medium text-md text-my-açıkgri focus:border-2 focus:border-my-açıkgri focus:font-bold focus:text-my-4b4b4bgri bg-my-ebbeyaz rounded-xl hover:text-my-beyaz hover:bg-my-siyah group">Stok Takibi</Link>
            </li>
            <li>
              <Link href="/login/bizeulasin" className="block p-2 font-medium text-md text-my-açıkgri focus:border-2 focus:border-my-açıkgri focus:font-bold focus:text-my-4b4b4bgri bg-my-ebbeyaz rounded-xl hover:text-my-beyaz hover:bg-my-siyah group">Bize Ulaşın</Link>
            </li>
            <div className="divider mt-10 mb-10"></div>
            <li>
              <Link href="/" className="block p-2 font-medium text-md text-my-açıkgri focus:border-2 focus:border-my-açıkgri focus:font-bold focus:text-my-4b4b4bgri bg-my-ebbeyaz rounded-xl hover:text-my-beyaz hover:bg-my-siyah group">Çıkış Yap</Link>
            </li>
          </ul>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
          <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button onClick={toggleSidebar} className={`lg:hidden p-3 font-bold text-lg leading-tight antialiased ${isSidebarOpen ? 'hidden' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
                <a href="#" className="flex ml-2 md:mr-8 lg:mr-24">
                  <img src="/images/BBSMlogo.png" className="h-16 mr-3" alt="logo" />

                </a>
              </div>
              <div className="flex items-center">
                <button type="button" className="flex items-center text-sm">
                  <span className="sr-only">Open user menu</span>
                  <p className="text-center text-my-siyah font-semibold items-center pr-8">Yasin Ufuk ORHANLAR</p>
                  <img src="/images/yasin.webp" className="h-16 w-16 rounded-full" alt="Yasin Bey" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div className="p-6 pt-8 mt-14 lg:ml-64">
        <div className="p-6 mt-5 bg-my-beyaz rounded-3xl">
          <div className="flex p-2 items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0">
            <h2 className="text-2xl font-bold text-my-siyah mb-4">Kart Bilgileri</h2>
            <div className="flex items-center flex-wrap gap-2 sm:gap-0">
              <div className="items-center bg-green-500 p-2 px-4 sm:px-8 rounded-full">
                <button onClick={handleExcelDownload} className="font-semibold text-my-beyaz text-md">Excel</button>
              </div>
              <div className="items-center bg-orange-600 p-2 px-4 sm:px-8 rounded-full ml-2 sm:ml-4">
                <button onClick={handlePDFDownload} className="font-semibold text-my-beyaz text-md">PDF</button>
              </div>
              <div className="items-center bg-yellow-500 p-2 px-4 sm:px-8 rounded-full ml-2 sm:ml-4">
                <button onClick={handleSaveCardInfo} className="font-semibold text-my-beyaz text-md">Kaydet</button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-my-siyah">
            <input onChange={handleChange} placeholder="Ad Soyad" value={adSoyad} type="text" id="adSoyad" className="bg-my-beyaz border p-2 rounded-md w-full" />
            <input onChange={handleChange} placeholder="Telefon No" value={telNo} type="text" id="telNo" className="bg-my-beyaz border p-2 rounded-md w-full" />
            <input onChange={handleChange} placeholder="Marka Model" value={markaModel} type="text" id="markaModel" className="bg-my-beyaz border p-2 rounded-md w-full" />
            <input onChange={handleChange} placeholder="Plaka" value={plaka} type="text" id="plaka" className="bg-my-beyaz border p-2 rounded-md w-full" />
            <input onChange={handleChange} placeholder="Km" value={km} type="text" id="km" className="bg-my-beyaz border p-2 rounded-md w-full" />
            <input onChange={handleChange} placeholder="Model Yılı" value={modelYili} type="text" id="modelYili" className="bg-my-beyaz border p-2 rounded-md w-full" />
            <input onChange={handleChange} placeholder="Şasi" value={sasi} type="text" id="sasi" className="bg-my-beyaz border p-2 rounded-md w-full" />
            <input onChange={handleChange} placeholder="Renk" value={renk} type="text" id="renk" className="bg-my-beyaz border p-2 rounded-md w-full" />
            <input onChange={handleChange} placeholder="Giriş Tarihi" value={girisTarihi} type="text" id="girisTarihi" className="bg-my-beyaz border p-2 rounded-md w-full" />
            <textarea onChange={handleChange} placeholder="Adres" value={adres} id="adres" className="bg-my-beyaz border p-2 rounded-md w-full" rows="1"></textarea>
            <textarea onChange={handleChange} placeholder="Notlar" value={notlar} id="notlar" className="bg-my-beyaz border p-2 rounded-md w-full col-span-1 sm:col-span-2" rows="3"></textarea>
          </div>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 mt-8'>
            <h2 className="text-2xl font-bold text-my-siyah">Yapılanlar</h2>
            <div className="flex flex-wrap gap-2">
              <button onClick={handleEkleYapilanlar} className="p-2 px-4 sm:px-8 rounded-full font-semibold bg-blue-500 text-my-beyaz text-md">Ekle</button>
              <button onClick={handleSaveYapilanlar} className="p-2 px-4 sm:px-8 rounded-full font-semibold bg-yellow-500 text-my-beyaz text-md">Kaydet</button>
            </div>
          </div>
          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <div className="min-w-full inline-block align-middle">
              <table className="min-w-full text-sm divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Birim Adedi</th>
                    <th className="px-3 sm:px-6 py-3 text-left font-medium text-gray-600 uppercase tracking-wider">Parça Adı</th>
                    <th className="px-3 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Birim Fiyatı</th>
                    <th className="px-3 sm:px-6 py-3 text-left font-medium text-gray-700 uppercase tracking-wider">Toplam Fiyat</th>
                    <th className="px-3 sm:px-6 py-3 text-center font-medium text-gray-700 uppercase tracking-wider">Sil</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {yapilanlar.map((yapilan, index) => (
                    <tr key={index}>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <input
                          onChange={(event) => handleChange2(event, index)}
                          placeholder="1"
                          value={yapilan.birimAdedi || ''}
                          type="number"
                          name="birimAdedi"
                          className="bg-my-beyaz border p-2 rounded-md w-full"
                        />
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <input
                          onChange={(event) => handleChange2(event, index)}
                          placeholder="Parça Adı"
                          value={yapilan.parcaAdi || ''}
                          type="text"
                          name="parcaAdi"
                          className="bg-my-beyaz border p-2 rounded-md w-full truncate"
                          title={yapilan.parcaAdi || ''}
                        />
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <input
                          onChange={(event) => handleChange2(event, index)}
                          placeholder="0"
                          value={yapilan.birimFiyati || ''}
                          type="number"
                          name="birimFiyati"
                          className="bg-my-beyaz border p-2 rounded-md w-full"
                        />
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">{(yapilan.birimFiyati) * (yapilan.birimAdedi)}</td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button onClick={() => handleDelete(yapilan.id)} className="text-red-500 hover:text-red-700">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <h2 className="text-xl text-end font-bold text-my-siyah p-4 sm:p-8 m-4 mt-8">Toplam Fiyat : {toplamFiyat} </h2>
        </div>
      </div>
    </>
  );
}
