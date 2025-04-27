import Head from "next/head"
import Link from "next/link"
import Header from '../components/header';
import Footer from '../components/footer';

export default function Home() {
  return <>
    <Head>
      <title>S&Y Otomotiv - Maslak</title>
      <link rel="icon" href="/syoto.ico" />
    </Head>

    <Header />

    {/* Hero Section */}
    <div className="relative h-screen pt-16">
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/50 z-10"></div>
      <img 
        src="/images/hero-bg.jpg" 
        alt="S&Y Otomotiv Hero" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="flex text-5xl md:text-7xl font-bold mb-6 text-center tracking-tight">S<p className=" text-3xl items-end pl-1 -pr-1 translate-y-5"> & </p>Y OTOMOTİV<p className="text-xl items-end pl-1 -pr-1 translate-y-8">MASLAK</p></h1>
        <p className="text-2xl md:text-3xl mb-10 text-center font-light tracking-wide">Maslak'ın En Güvenilir Servisi</p>
        <Link 
          href="/bizeulasin" 
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full transition duration-300 transform hover:scale-105 shadow-lg"
        >
          Hemen Randevu Alın
        </Link>
      </div>
    </div>

    {/* Services Section */}
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Hizmetlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-red-600 text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-bold mb-2">Periyodik Bakım</h3>
            <p className="text-gray-600">Aracınızın düzenli bakımını uzman ekibimizle gerçekleştiriyoruz.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-red-600 text-4xl mb-4">🚗</div>
            <h3 className="text-xl font-bold mb-2">Motor Tamiri</h3>
            <p className="text-gray-600">Motor arızalarında profesyonel çözümler sunuyoruz.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-red-600 text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">Oto Elektrik</h3>
            <p className="text-gray-600">Elektrik sistemlerinde uzman kadromuzla hizmetinizdeyiz.</p>
          </div>
        </div>
      </div>
    </div>

    {/* About Section */}
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Neden S&Y Otomotiv?</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span>30+ yılı aşkın sektör deneyimi ve uzman teknik kadro</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span>En son teknoloji ekipmanlar ve modern servis altyapısı</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span>Hızlı, güvenilir ve şeffaf servis anlayışı</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">✓</span>
                <span>Rekabetçi fiyatlar ve müşteri memnuniyeti garantisi</span>
              </li>
            </ul>
          </div>
          <div className="relative h-96">
            <img 
              src="/images/workshop.jpg" 
              alt="S&Y Otomotiv Atölye" 
              className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Contact CTA */}
    <div className="bg-red-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Aracınız İçin Profesyonel Çözüm</h2>
        <p className="text-xl mb-8">Hemen randevu alın, aracınızı güvenle teslim edin.</p>
        <Link 
          href="/bizeulasin" 
          className="bg-white text-red-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300"
        >
          Randevu Al
        </Link>
      </div>
    </div>

    <Footer />
  </>
}
