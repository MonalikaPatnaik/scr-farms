
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'Products', path: '/products' },
    { title: 'About', path: '/about' },
    { title: 'Bilona Method', path: '/bilona-method' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <span className="text-2xl font-display font-bold text-brand-red">SCR</span>
              <span className="text-2xl font-display ml-2 text-foreground">Agro Farms</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {menuItems.map((item) => (
              <Link 
                key={item.title}
                to={item.path}
                className="px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-brand-cream hover:text-brand-red"
              >
                {item.title}
              </Link>
            ))}
            <Button className="ml-4 bg-brand-red hover:bg-brand-red/90 text-white">Order Now</Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-brand-red hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-red"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        'md:hidden transition-all duration-300 ease-in-out transform',
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      )}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-sm">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-brand-cream hover:text-brand-red"
              onClick={closeMenu}
            >
              {item.title}
            </Link>
          ))}
          <Button className="w-full mt-4 bg-brand-red hover:bg-brand-red/90 text-white">Order Now</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
