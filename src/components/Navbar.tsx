import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, ShoppingCart, LogIn, LogOut, User, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut, isAdmin } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get cart item count
  const { data: cartCount = 0 } = useQuery({
    queryKey: ['cartCount', user?.id],
    queryFn: async () => {
      // Placeholder for actual cart count fetching
      return 0;
    },
    enabled: !!user,
  });

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

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully."
    });
    navigate('/');
  };

  const menuItems = [
    { title: t('nav.home'), path: '/' },
    { title: t('nav.products'), path: '/products' },
    { title: t('nav.about'), path: '/about' },
    { title: t('nav.bilonaMethod'), path: '/bilona-method' },
    { title: t('nav.contact'), path: '/contact' },
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
            
            {/* Cart Icon with Badge */}
            <Link 
              to="/cart" 
              className="px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-brand-cream relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-red text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/orders" className="px-3 py-2 text-sm font-medium transition-colors rounded-md hover:bg-brand-cream hover:text-brand-red">
              {t('nav.orders')}
            </Link>
            
            {/* Authentication */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    <span className="text-sm truncate max-w-[150px]">{user.email}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        {t('nav.adminDashboard')}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('nav.signOut')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                className="ml-4 bg-brand-red hover:bg-brand-red/90 text-white"
                asChild
              >
                <Link to="/auth">
                  <LogIn className="h-4 w-4 mr-2" />
                  {t('nav.signIn')}
                </Link>
              </Button>
            )}
            <LanguageSelector />
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
          
          <Link
            to="/cart"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-brand-cream hover:text-brand-red flex items-center"
            onClick={closeMenu}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            {t('nav.cart')}
            {cartCount > 0 && (
              <span className="ml-2 bg-brand-red text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          
          {isAdmin && (
            <Link
              to="/admin"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-brand-cream hover:text-brand-red flex items-center"
              onClick={closeMenu}
            >
              <Settings className="h-5 w-5 mr-2" />
              {t('nav.adminDashboard')}
            </Link>
          )}
          
          {user ? (
            <div className="block px-3 py-2 rounded-md text-base font-medium hover:bg-brand-cream hover:text-brand-red">
              <button onClick={handleSignOut} className="flex items-center w-full">
                <LogOut className="h-5 w-5 mr-2" />
                {t('nav.signOut')}
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-brand-cream hover:text-brand-red"
              onClick={closeMenu}
            >
              <div className="flex items-center">
                <LogIn className="h-5 w-5 mr-2" />
                {t('nav.signIn')}
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;