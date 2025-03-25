
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  title: string;
  image: string;
  price: string;
  unit: string;
  description?: string;
  id: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image, price, unit, description, id }) => {
  return (
    <motion.div 
      className="glass-panel overflow-hidden flex flex-col h-full"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/product/${id}`} className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-brand-red text-white text-xs px-2 py-1 rounded-full">
          A2 Sahiwal
        </div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <Link to={`/product/${id}`}>
          <h3 className="font-display text-xl font-semibold mb-2 hover:text-brand-red transition-colors">{title}</h3>
        </Link>
        {description && (
          <p className="text-sm text-gray-600 mb-4">{description}</p>
        )}
        <div className="mt-auto flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-lg font-bold text-brand-red">₹{price}</span>
              <span className="text-sm text-gray-500 ml-1">/ {unit}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              className="flex-1 bg-white border-2 border-brand-red text-brand-red hover:bg-brand-red/10"
              asChild
            >
              <Link to={`/product/${id}`}>
                <Eye className="h-4 w-4 mr-2" />
                View
              </Link>
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-brand-red hover:bg-brand-red/90 text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
