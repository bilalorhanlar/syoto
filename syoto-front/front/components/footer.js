import Link from "next/link";

export default function Footer()
{
    return <>
        <div className="px-12 pt-14 mx-auto sm:max-w-full md:max-w-full lg:max-w-full md:px-40 lg:px-20 bg-[#1a1a1a]">
            <div className="grid gap-10 row-gap-6 mb-14 sm:grid-cols-2 lg:grid-cols-4">
                <div className="sm:col-span-2">
                    <div className="mr-4 mb-8 block cursor-pointer py-2">
                        <img src="/images/logoo.png" alt="S&Y Otomotiv" className="h-20 w-auto" />
                    </div>
                    <div className="mt-4 lg:max-w-sm">
                        <p className="text-sm text-[#e0e0e0]">
                            Maslak'ın güvenilir oto servisi olarak, araçlarınızın bakım ve onarımında uzman kadromuzla hizmetinizdeyiz.
                        </p>
                    </div>
                </div>
                <div className="space-y-2 text-sm">
                    <p className="text-lg font-bold tracking-wide text-[#f5f5f5] border-b border-[#ebebeb] pb-2 inline-block">İletişim</p>
                    <div className="flex">
                        <p className="mr-1 font-bold text-[#fff]">Telefon:</p>
                        <a href="tel:+905352311726" aria-label="Telefon" title="Telefon" className="transition-colors duration-300 text-[#e0e0e0] hover:text-[#81C4FF]">+90 535 231 17 26</a>
                    </div>
                    <div className="flex">
                        <p className="mr-1 font-bold text-[#fff]">E-posta:</p>
                        <a href="mailto:info@syotomotiv.com" aria-label="E-posta" title="E-posta" className="transition-colors duration-300 text-[#e0e0e0] hover:text-[#81C4FF]">maslaksyotomotiv@gmail.com</a>
                    </div>
                    <div className="flex">
                        <p className="mr-1 font-bold text-[#fff]">Adres:</p>
                        <span className="text-[#e0e0e0]">Atatürk Oto Sanayi Sitesi 2.Kısım, 8. Sokak No:254, 34000 Sarıyer/İstanbul</span>
                    </div>
                </div>
                <div>
                    <span className="text-lg font-bold tracking-wide text-[#f5f5f5] border-b border-[#ebebeb] pb-2 inline-block">Sosyal Medya</span>
                    <div className="flex items-center mt-4 space-x-4">
                        <a href="#" target="_blank" className="text-[#e0e0e0] transition-colors duration-300 hover:text-[#81C4FF]">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
                                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z"></path>
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/syotomotivmaslak/" target="_blank" className="text-[#e0e0e0] transition-colors duration-300 hover:text-[#81C4FF]">
                            <svg viewBox="0 0 30 30" fill="currentColor" className="h-6">
                                <circle cx="15" cy="15" r="4"></circle>
                                <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10 C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1 c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z"></path>
                            </svg>
                        </a>
                    </div>
                    <p className="mt-4 text-sm text-[#e0e0e0]">
                        Aracınızın bakım ve onarımı için profesyonel çözümler sunuyoruz. Güvenilir ve kaliteli hizmet için bizi tercih edin.
                    </p>
                </div>
            </div>
            <div className="flex flex-col-reverse justify-between  pb-4 lg:flex-row">
                <div className="w-full flex h-[2px] mb-6">
                    <div className="w-1/3 h-full bg-[#81C4FF]"></div>
                    <div className="w-1/3 h-full bg-[#16588E]"></div>
                    <div className="w-1/3 h-full bg-[#E7222E]"></div>
                </div>
            </div>
            <div className="flex justify-between items-center pb-8">
                <p className="text-sm text-[#e0e0e0]">
                    © 2025 S&Y Otomotiv. Tüm hakları saklıdır.
                </p>
                <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
                    <li>
                        <Link href="/gizlilik" className="text-sm text-[#e0e0e0] transition-colors duration-300 hover:text-[#81C4FF]">Gizlilik Politikası</Link>
                    </li>
                    <li>
                        <Link href="/kullanim-kosullari" className="text-sm text-[#e0e0e0] transition-colors duration-300 hover:text-[#81C4FF]">Kullanım Koşulları</Link>
                    </li>
                </ul>
            </div>
        </div>
    </>
}