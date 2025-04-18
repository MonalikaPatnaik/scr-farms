import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://photos.google.com/share/AF1QipNt6J8_YPQrAIW68DLkIijFAxVevUyNm3joPjrQmwkkJ8kaSA6omb3FtgDw4DOAIw/photo/AF1QipOkt33H_MV4YZ76cu2pRbGV-LiB3uyX3ZuuAOqy?key=WVRTTkdGb3ZKX1VKUDNVR2w3VE9XSVI0WTZlb3dR')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundBlendMode: 'overlay',
          opacity: 1
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-blue/50 via-white/60 to-white" />
      
      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-red mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/products">
                <Button className="bg-brand-red hover:bg-brand-red/90 text-white px-8 py-4">
                  {t('hero.shopNow')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
