import Link from "next/link"
import Head from "next/head"
import Header from '../components/header';
import Footer from '../components/footer';

export default function cozumler() {
    return <>
        <Header />
        <Head>
            <title>S&Y Otomotiv - Hizmetlerimiz</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Hero Section */}
        <div className="relative h-[70vh]">
            <div className="absolute inset-0 bg-gray-900"></div>
            <div className="absolute inset-0 bg-[url('/images/hizmet.jpg')] bg-cover bg-center opacity-40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent"></div>
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
                        Hizmetlerimiz
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light">
                        Aracınız için profesyonel ve güvenilir çözümler
                    </p>
                    <div className="mt-12 flex gap-4 justify-center">
                        <Link 
                            href="/bizeulasin" 
                            className="bg-red-600 text-white font-bold py-3 px-8 rounded-full hover:bg-red-700 transition duration-300 transform hover:scale-105"
                        >
                            Randevu Al
                        </Link>
                        <Link 
                            href="tel:+905352311726" 
                            className="bg-white/10 text-white font-bold py-3 px-8 rounded-full hover:bg-white/20 transition duration-300 transform hover:scale-105"
                        >
                            Hemen Ara
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Periyodik Bakım */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                    <div className="relative h-48">
                        <img src="/images/bakim.jpg" alt="Periyodik Bakım" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 "></div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Periyodik Bakım</h3>
                        <p className="text-gray-600 mb-4">
                            Aracınızın düzenli bakımını uzman ekibimizle gerçekleştiriyoruz. Yağ değişimi, filtre değişimi ve genel kontrol hizmetlerimizle aracınızın ömrünü uzatın.
                        </p>
                        <Link href="/bizeulasin" className="text-red-600 hover:text-red-700 font-semibold">
                            Randevu Al →
                        </Link>
                    </div>
                </div>

                {/* motor yenileme */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                    <div className="relative h-48">
                        <img src="/images/motor.jpg" alt="Motor Tamiri" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 "></div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Motor Yenileme</h3>
                        <p className="text-gray-600 mb-4">
                            Motor arızalarında profesyonel çözümler sunuyoruz. Küçük onarımlardan komple motor revizyonuna kadar tüm işlemler için uzman kadromuz hizmetinizde.
                        </p>
                        <Link href="/bizeulasin" className="text-red-600 hover:text-red-700 font-semibold">
                            Randevu Al →
                        </Link>
                    </div>
                </div>

                {/* Oto Elektrik */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                    <div className="relative h-48">
                        <img src="/images/elektrik.jpg" alt="Oto Elektrik" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 "></div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Oto Elektrik & Elektronik</h3>
                        <p className="text-gray-600 mb-4">
                            Elektrik sistemlerinde uzman kadromuzla hizmetinizdeyiz. Akü, alternatör, marş motoru ve tüm elektrik sistemleri için profesyonel çözümler.
                        </p>
                        <Link href="/bizeulasin" className="text-red-600 hover:text-red-700 font-semibold">
                            Randevu Al →
                        </Link>
                    </div>
                </div>

                {/* Fren Sistemi */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                    <div className="relative h-48">
                        <img src="/images/fren.jpg" alt="Fren Sistemi" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 "></div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Fren Sistemi</h3>
                        <p className="text-gray-600 mb-4">
                            Fren sistemlerinde güvenli ve profesyonel çözümler. Balata, disk, kampana ve tüm fren sistemi bileşenleri için kaliteli hizmet.
                        </p>
                        <Link href="/bizeulasin" className="text-red-600 hover:text-red-700 font-semibold">
                            Randevu Al →
                        </Link>
                    </div>
                </div>

                {/* Klima Bakımı */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                    <div className="relative h-48">
                        <img src="/images/klima.jpg" alt="Klima Bakımı" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 "></div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Klima Bakımı</h3>
                        <p className="text-gray-600 mb-4">
                            Klima sistemlerinde uzman çözümler. Gaz dolumu, kompresör tamiri ve tüm klima sistemi bakımları için profesyonel hizmet.
                        </p>
                        <Link href="/bizeulasin" className="text-red-600 hover:text-red-700 font-semibold">
                            Randevu Al →
                        </Link>
                    </div>
                </div>

                {/* Kaporta & Boya */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                    <div className="relative h-48">
                        <img src="/images/boya.jpg" alt="Kaporta & Boya" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 "></div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Kaporta & Boya</h3>
                        <p className="text-gray-600 mb-4">
                            Kaporta düzeltme, göçük onarımı ve boya işlemlerinde kaliteli çözümler. Çarpma, çizik ve hasarlı bölgeler için profesyonel onarım hizmeti.
                        </p>
                        <Link href="/bizeulasin" className="text-red-600 hover:text-red-700 font-semibold">
                            Randevu Al →
                        </Link>
                    </div>
                </div>
                {/* döşeme işlemleri */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                    <div className="relative h-48">
                        <img src="/images/doseme.jpg" alt="Kaporta & Boya" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 "></div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Döşeme Tamiri & Yenileme</h3>
                        <p className="text-gray-600 mb-4">
                            Kaporta düzeltme, göçük onarımı ve boya işlemlerinde kaliteli çözümler. Çarpma, çizik ve hasarlı bölgeler için profesyonel onarım hizmeti.
                        </p>
                        <Link href="/bizeulasin" className="text-red-600 hover:text-red-700 font-semibold">
                            Randevu Al →
                        </Link>
                    </div>
                </div>
                {/* kuaför işlemleri */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                    <div className="relative h-48">
                        <img src="/images/kuafor.jpg" alt="Kaporta & Boya" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 "></div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Oto Kuaför & Boya Koruma</h3>
                        <p className="text-gray-600 mb-4">
                            Kaporta düzeltme, göçük onarımı ve boya işlemlerinde kaliteli çözümler. Çarpma, çizik ve hasarlı bölgeler için profesyonel onarım hizmeti.
                        </p>
                        <Link href="/bizeulasin" className="text-red-600 hover:text-red-700 font-semibold">
                            Randevu Al →
                        </Link>
                    </div>
                </div>
                {/* Lasitk ve rot balans işlemleri */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105">
                    <div className="relative h-48">
                        <img src="/images/rot.webp" alt="Kaporta & Boya" className="w-full h-full object-cover" />
                        <div className="absolute inset-0"></div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4 text-gray-800">Lastik & Rot Balans</h3>
                        <p className="text-gray-600 mb-4">
                            Kaporta düzeltme, göçük onarımı ve boya işlemlerinde kaliteli çözümler. Çarpma, çizik ve hasarlı bölgeler için profesyonel onarım hizmeti.
                        </p>
                        <Link href="/bizeulasin" className="text-red-600 hover:text-red-700 font-semibold">
                            Randevu Al →
                        </Link>
                    </div>
                </div>
            </div>
        </div>

        {/* CTA Section */}
        <div className="relative py-24">
            <div className="absolute inset-0 bg-[url('/images/cta-bg.jpg')] bg-cover bg-center opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-gray-200"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Aracınız İçin Profesyonel Çözüm
                </h2>
                <p className="text-xl text-gray-700 mb-12">
                    Hemen randevu alın, aracınızı güvenle teslim edin.
                </p>
                <Link 
                    href="/bizeulasin" 
                    className="inline-block bg-gray-900 text-white font-bold py-4 px-12 rounded-full hover:bg-gray-800 transition duration-300 transform hover:scale-105"
                >
                    Randevu Al
                </Link>
            </div>
        </div>

        <Footer />
    </>
}