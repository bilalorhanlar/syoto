import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed w-full z-50 bg-white shadow-md">
      <div className="container mx-auto">
        <nav className="px-4 py-2">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex-shrink-0">
              <img src="/images/logo.png" alt="S&Y Otomotiv" className="h-16 w-auto object-contain" />
            </Link>
            
            <button 
              onClick={toggleMenu} 
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

            <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} absolute lg:relative top-20 lg:top-0 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-lg lg:shadow-none`}>
              <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-8 p-4 lg:p-0">
                <li>
                  <Link href="/" className="block text-gray-800 hover:text-red-600 transition duration-300 text-lg font-medium">
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link href="/hizmetler" className="block text-gray-800 hover:text-red-600 transition duration-300 text-lg font-medium">
                    Hizmetler
                  </Link>
                </li>
                <li>
                  <Link href="/hakkimizda" className="block text-gray-800 hover:text-red-600 transition duration-300 text-lg font-medium">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href="/bizeulasin" className="block text-gray-800 hover:text-red-600 transition duration-300 text-lg font-medium">
                    Bize Ulaşın
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        
      </div>
      <div className="w-screen flex">
          <div className="w-1/3 h-[4px] bg-[#81C4FF]"></div>
          <div className="w-1/3 h-[4px] bg-[#16588E]"></div>
          <div className="w-1/3 h-[4px] bg-[#E7222E]"></div>
        </div>
    </header>
  );
}
