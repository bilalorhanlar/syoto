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
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('https://16.171.130.205/auth/control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ 
          username: username.trim(),
          password: password.trim()
        }),
      });

      const data = await response.json();
      console.log('Login response:', data);
      
      if (response.ok && data.result) {
        login(data.token);
        router.push('/login/kartlar');
      } else {
        console.error('Login failed:', data);
        alert('Kullanıcı adı veya şifre hatalı! Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Giriş hatası:', error);
      if (error.message.includes('Failed to fetch')) {
        alert('Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.');
      } else {
        alert('Giriş yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>BBSM Garage</title>
        <link rel="icon" href="/BBSM.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="min-h-screen bg-my-home bg-cover bg-center bg-fixed">
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
          <form onSubmit={handleSubmit} className="bg-my-siyah border-2 border-my-4b4b4bgri bg-opacity-50 backdrop-blur-sm p-4 sm:p-8 rounded-3xl shadow-lg w-full max-w-sm">
            <h1 className="font-extrabold text-transparent text-2xl sm:text-3xl bg-clip-text bg-gradient-to-r from-blue-400 via-blue-900 to-red-600 text-center">Hoş Geldiniz!</h1>
            <h2 className="text-xl sm:text-2xl font-bold text-my-beyaz mb-4 text-center">Giriş Yapınız</h2>
            
            <div className="space-y-2 sm:space-y-4">
              <div>
                <p className="font-semibold text-my-beyaz">Kullanıcı Adı</p>
                <input 
                  className="w-full p-2 mt-1 rounded-xl border border-my-açıkgri bg-white/90" 
                  type="text" 
                  placeholder="Kullanıcı Adı" 
                  value={username} 
                  onChange={handleUsernameChange}
                />
              </div>
              
              <div>
                <p className="font-semibold text-my-beyaz">Şifre</p>
                <input 
                  className="w-full p-2 mt-1 rounded-xl border border-my-açıkgri bg-white/90" 
                  type="password" 
                  placeholder="Şifre" 
                  value={password} 
                  onChange={handlePasswordChange}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-6">
              <Link 
                href="/kayit" 
                className="flex-1 p-2 font-semibold rounded-xl border-2 border-my-4b4b4bgri bg-my-siyah transition duration-500 ease-in-out hover:bg-my-4b4b4bgri text-center"
              >
                <p className="font-extrabold text-transparent text-sm sm:text-lg bg-clip-text bg-gradient-to-r from-my-beyaz to-my-açıkgri">
                  Kayıt Ol
                </p>
              </Link>
              <button 
                type="submit" 
                className="flex-1 p-2 font-semibold rounded-xl border-2 border-my-4b4b4bgri bg-my-siyah text-my-beyaz transition duration-500 ease-in-out hover:bg-my-4b4b4bgri"
              >
                <p className="font-extrabold text-transparent text-sm sm:text-lg bg-clip-text bg-gradient-to-r from-blue-400 to-blue-900">
                  Giriş Yap
                </p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
