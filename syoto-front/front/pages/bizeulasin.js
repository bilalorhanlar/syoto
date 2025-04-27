import Link from "next/link"
import Head from "next/head"
import Script from 'next/script'
import Header from '../components/header';
import Footer from '../components/footer';
import { useState, useCallback } from 'react';

const mapContainerStyle = {
    width: '100%',
    height: '500px'
};

const center = {
    lat: 41.1149455,  // Maslak, 8. Sokak koordinatları
    lng: 29.0182724
};

const options = {
    styles: [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }]
        }
    ],
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    mapTypeId: 'roadmap',
    clickableIcons: true,
    zoom: 18
};

export default function bizeulasin() {
    const [isOpen, setIsOpen] = useState(false);
    const [map, setMap] = useState(null);

    const onLoad = useCallback((map) => {
        setMap(map);
        // Haritayı merkeze odakla
        map.setZoom(17);
    }, []);

    const onUnmount = useCallback((map) => {
        setMap(null);
    }, []);

    const handleMarkerClick = () => {
        setIsOpen(true);
        if (map) {
            map.panTo(center);
            map.setZoom(18);
        }
    };

    return <>
        <Header />
        <Head>
            <title>S&Y Otomotiv - Bize Ulaşın</title>
            <link rel="icon" href="/syoto.ico" />
        </Head>
        <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
            strategy="lazyOnload"
        />
        
        {/* Hero Section */}
        <div className="relative h-[70vh]">
            <div className="absolute inset-0 bg-gray-900"></div>
            <div className="absolute inset-0 bg-[url('/images/bizeulasin.jpg')] bg-cover bg-center opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent"></div>
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
                        Bize Ulaşın
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light">
                        Aracınız için profesyonel çözümler sunuyoruz
                    </p>
                    <div className="mt-12 flex gap-4 justify-center">
                        <Link 
                            href="tel:+905352311726" 
                            className="bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition duration-300 transform hover:scale-105"
                        >
                            Hemen Ara
                        </Link>
                        <Link 
                            href="#contact-form" 
                            className="bg-white/10 text-white font-bold py-3 px-8 rounded-full hover:bg-white/20 transition duration-300 transform hover:scale-105"
                        >
                            Randevu Al
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        {/* Map Section */}
        <div className="w-full py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">Bizi Ziyaret Edin</h2>
                    <p className="text-gray-600">Maslak'taki servisimize kolayca ulaşabilirsiniz</p>
                </div>
                <div className="rounded-lg over shadow-lg">
                    {/* Google Maps bileşeni client-side'da yüklenecek */}
                    <div id="map" style={mapContainerStyle}></div>
                    <Script id="google-maps-script" strategy="afterInteractive">
                        {`
                            function initMap() {
                                const map = new google.maps.Map(document.getElementById('map'), {
                                    center: { lat: ${center.lat}, lng: ${center.lng} },
                                    zoom: 17,
                                    styles: ${JSON.stringify(options.styles)},
                                    disableDefaultUI: ${options.disableDefaultUI},
                                    zoomControl: ${options.zoomControl},
                                    mapTypeControl: ${options.mapTypeControl},
                                    streetViewControl: ${options.streetViewControl},
                                    fullscreenControl: ${options.fullscreenControl},
                                    mapTypeId: '${options.mapTypeId}',
                                    clickableIcons: ${options.clickableIcons}
                                });
                                
                                const marker = new google.maps.Marker({
                                    position: { lat: ${center.lat}, lng: ${center.lng} },
                                    map: map,
                                    icon: {
                                        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                                        scaledSize: new google.maps.Size(40, 40),
                                        zIndex: 999
                                    }
                                });
                                
                                const infoWindow = new google.maps.InfoWindow({
                                    content: \`
                                        <div class="p-2">
                                            <h3 class="font-bold text-lg mb-1">S&Y Otomotiv</h3>
                                            <p class="text-gray-600 mb-2">Atatürk Oto Sanayi Sitesi 2.Kısım, 8. Sokak No:254, 34000 Sarıyer/İstanbul</p>
                                            <div class="flex gap-2">
                                                <a href="https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}" 
                                                   target="_blank" rel="noopener noreferrer" 
                                                   class="text-blue-600 hover:text-blue-800 text-sm">
                                                    Yol Tarifi Al
                                                </a>
                                            </div>
                                        </div>
                                    \`
                                });
                                
                                marker.addListener('click', () => {
                                    infoWindow.open(map, marker);
                                });
                            }
                            
                            // Google Maps API yüklendiğinde haritayı başlat
                            if (typeof google !== 'undefined') {
                                initMap();
                            } else {
                                // API henüz yüklenmediyse, yüklendiğinde haritayı başlat
                                window.initMap = initMap;
                            }
                        `}
                    </Script>
                </div>
                
                {/* Yol Tarifi Kartları */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-red-600 mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Toplu Taşıma</h3>
                        <p className="text-gray-600">Metro ile Atatürk Oto Sanayi durağında inin, 5 dakikalık yürüme mesafesindeyiz.</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-red-600 mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Otopark</h3>
                        <p className="text-gray-600">Misafirlerimiz için ücretsiz otoparkımız mevcuttur.</p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="text-red-600 mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                        </div>
                        <h3 className="font-bold text-lg mb-2">Çalışma Saatleri</h3>
                        <p className="text-gray-600">Hafta içi: 08:30-19:00<br/>Cumartesi: 09:30-17:00</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">İletişim Bilgileri</h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <svg className="w-6 h-6 text-red-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                                <div>
                                    <h3 className="font-semibold">Adres</h3>
                                    <p className="text-gray-600">Atatürk Oto Sanayi Sitesi 2.Kısım, 8. Sokak No:254, 34000 Sarıyer/İstanbul</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <svg className="w-6 h-6 text-red-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                                <div>
                                    <h3 className="font-semibold">Telefon</h3>
                                    <a href="tel:+905352311726" className="text-gray-600 hover:text-red-600">+90 535 231 1726</a>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <svg className="w-6 h-6 text-red-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <div>
                                    <h3 className="font-semibold">E-posta</h3>
                                    <a href="mailto:info@syotomotiv.com" className="text-gray-600 hover:text-red-600">maslaksyotomotiv@gmail.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Çalışma Saatleri</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Pazartesi</span>
                                <span className="font-semibold">08:30 - 19:00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Salı</span>
                                <span className="font-semibold">08:30 - 19:00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Çarşamba</span>
                                <span className="font-semibold">08:30 - 19:00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Perşembe</span>
                                <span className="font-semibold">08:30 - 19:00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Cuma</span>
                                <span className="font-semibold">08:30 - 19:00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Cumartesi</span>
                                <span className="font-semibold">09:30 - 17:00</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Pazar</span>
                                <span className="font-semibold">Kapalı</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Randevu Formu</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="name">Ad Soyad</label>
                            <input 
                                type="text" 
                                id="name" 
                                className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                placeholder="Adınız ve soyadınız"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="phone">Telefon</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                placeholder="Telefon numaranız"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="car">Araç Bilgisi</label>
                            <input 
                                type="text" 
                                id="car" 
                                className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                                placeholder="Marka, model ve yıl"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="service">Hizmet</label>
                            <select 
                                id="service" 
                                className="w-full px-4 py-2 border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                            >
                                <option value="">Hizmet seçiniz</option>
                                <option value="bakim">Periyodik Bakım</option>
                                <option value="motor">Motor Tamiri</option>
                                <option value="elektrik">Oto Elektrik</option>
                                <option value="diger">Diğer</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2" htmlFor="message">Mesaj</label>
                            <textarea 
                                id="message" 
                                rows="4" 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-600"
                                placeholder="Mesajınız"
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            Randevu Al
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <Footer />
    </>
}
  