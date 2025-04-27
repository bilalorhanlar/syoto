import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from "next/head";
import Link from "next/link";
import { useAuth } from '../auth-context';
import { useLoading } from './_app';

export default function Home() {
  const { loading, setLoading } = useLoading();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch('http://13.60.28.234:4000/auth/control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.result) {
          login(data.token);
          router.push('login/kartlar'); // login sonrası yönlendirilecek sayfa
        } else {
          alert('Kullanıcı adı veya şifre hatalı! Eğer kaydınız yoksa kayıt ol kısmından bize ulaşabilirsiniz.');
        }
      } else {
        alert('Giriş başarısız');
      }
    } catch (error) {
      console.error('Giriş sırasında bir hata oluştu', error);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>BBSM Garage</title>
        <link rel="icon" href="/BBSM.ico" /> {"/public/BBSM.ico"}
      </Head>
      <div className="bg-my-home bg-cover bg-center w-full h-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-my-siyah border-2 border-my-4b4b4bgri bg-opacity-50 backdrop-blur-sm p-8 rounded-3xl shadow-lg max-w-sm w-full flex flex-col items-center justify-center">
            <h1 className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-400 via-blue-900 to-red-600">Hoş Geldiniz!</h1>
            <h2 className="text-2xl font-bold text-my-beyaz mb-4 text-center">Giriş Yapınız</h2>
            <p className="w-full font-semibold p-2 text-my-beyaz text-left">Kullanıcı Adı</p>
            <input className="w-full p-2 mb-4 rounded-xl border border-my-açıkgri" type="text" placeholder="Kullanıcı Adı" value={username} onChange={handleUsernameChange} />
            <p className="w-full font-semibold p-2 text-my-beyaz text-left">Şifre</p>
            <input className="w-full p-2 mb-6 rounded-xl border border-my-açıkgri" type="password" placeholder="Şifre" value={password} onChange={handlePasswordChange} />
            <div className="w-full text-center flex gap-4">
              <Link href="/kayit" className="w-1/2 p-2 mr-2 font-semibold rounded-xl border-2 border-my-4b4b4bgri bg-my-siyah transition duration-500 ease-in-out hover:bg-my-4b4b4bgri"><p className="font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-my-beyaz to-my-açıkgri">Kayıt Ol</p></Link>
              <button type="submit" className="w-1/2 p-2 ml-2 font-semibold rounded-xl border-2 border-my-4b4b4bgri bg-my-siyah text-my-beyaz transition duration-500 ease-in-out hover:bg-my-4b4b4bgri"><p className="font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-blue-400 to-blue-900">Giriş Yap</p></button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
