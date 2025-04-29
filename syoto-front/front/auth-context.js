import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (token) => {
    const userData = { token };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/'); // Giriş sayfasına yönlendirin
  };

  const fetchWithAuth = async (url, options = {}) => {
    const token = user?.token;
    if (!token) {
      logout();
      return;
    }

    // Development ortamında SSL doğrulamasını atla
    const isDev = process.env.NODE_ENV === 'development';
    const finalUrl = isDev ? url.replace('https://', 'http://') : url;

    const response = await fetch(finalUrl, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
      }
    });

    if (response.status === 401) {
      // Token geçersiz veya süresi dolmuş, çıkış yap
      logout();
    }

    return response;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchWithAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
