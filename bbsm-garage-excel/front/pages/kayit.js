import Head from "next/head"
import Link from "next/link"

export default function Home() {
  return <>
    <Head>
      <title>BBSM Garage</title>
      <link rel="icon" href="/BBSM.ico"/> {"/public/BBSM.ico"}
    </Head>
    <div className="bg-my-home bg-cover bg-center w-full h-200">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-my-siyah border-2 border-my-4b4b4bgri bg-opacity-50 backdrop-blur-sm p-8 rounded-3xl shadow-lg max-w-sm w-full flex flex-col items-center justify-center ">
        <h1 className="p-4 font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-my-açıkgri to-my-beyaz">BBSM GARAGE</h1>
          <h2 className="text-xl font-bold text-my-açıkgri mb-4 text-center">Kayıt Olmak İçin Bize Ulaşın</h2>
          <div className="text-center w-full">
            <p className="w-full text-2xl p-1 font-thin mb-4 rounded-xl text-my-beyaz bg-my-4b4b4bgri border border-my-açıkgri">https://www.bbsmgarage.com</p>
            <p className="w-full text-2xl p-1 font-thin mb-4 rounded-xl text-my-beyaz bg-my-4b4b4bgri border border-my-açıkgri">info@BBSM.GARAGE</p>
            <p className="w-full text-2xl p-1 font-thin mb-4 rounded-xl text-my-beyaz bg-my-4b4b4bgri border border-my-açıkgri">+90 553 323 1993</p>
          </div>
          <Link href="/" className="w-1/2 text-center p-2 ml-2 font-semibold rounded-xl border-2 border-my-4b4b4bgri bg-my-siyah text-my-beyaz transition duration-500 ease-in-out hover:bg-my-4b4b4bgri"><p className="font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-blue-400 to-blue-900">Geri Dön</p></Link>
        </div>
      </div>
    </div>
  </>  
}
