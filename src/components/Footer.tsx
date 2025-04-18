import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, Mail, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-white to-brand-blue/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <PhoneCall className="h-5 w-5 text-brand-red mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium">Mrs. Sarika Reddy</p>
                  <p className="text-sm">+91 9868220018</p>
                  <p className="text-sm font-medium mt-2">S. Chandrasheker Reddy</p>
                  <p className="text-sm">+91 9701039748</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-brand-red mt-0.5 mr-2" />
                <p className="text-sm">info@scragrofarms.com</p>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-red mt-0.5 mr-2" />
                <p className="text-sm">SCR Agrofarms, NH-40, Gyrampalli, Annamaya Dist, AP-517213</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold">{t('footer.followUs')}</h3>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:text-brand-red/80">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:text-brand-red/80">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:text-brand-red/80">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold">{t('footer.quickLinks')}</h3>
            <div className="space-y-2">
              <Link to="/" className="text-sm hover:text-brand-red">
                {t('nav.home')}
              </Link>
              <Link to="/products" className="text-sm hover:text-brand-red">
                {t('nav.products')}
              </Link>
              <Link to="/about" className="text-sm hover:text-brand-red">
                {t('nav.about')}
              </Link>
              <Link to="/contact" className="text-sm hover:text-brand-red">
                {t('nav.contact')}
              </Link>
              <Link to="/bilona-method" className="text-sm hover:text-brand-red">
                {t('nav.bilonaMethod')}
              </Link>
              <Link to="/home-delivery" className="text-sm hover:text-brand-red">
                {t('nav.homeDelivery')}
              </Link>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold">{t('footer.hours')}</h3>
            <div className="space-y-2">
              <p className="text-sm">{t('footer.hoursText')}</p>
              <p className="text-sm">{t('footer.ordersText')}</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p> {t('footer.copyright')} {new Date().getFullYear()} SCR Agro Farms. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
