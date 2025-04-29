
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import { supabase } from '../integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/products';
import sahiwal from "../../public/sahiwal.png";
const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch products from Supabase
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      return data as Product[];
    },
  });

  // Update filtered products when products change
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  const handleSearch = (query: string) => {
    if (!products) return;
    
    if (query.trim() === '') {
      setFilteredProducts(products);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    const filtered = products.filter(product => {
      const titleMatch = searchTerms.some(term => 
        product.title.toLowerCase().includes(term)
      );
      const descMatch = searchTerms.some(term => 
        product.description.toLowerCase().includes(term)
      );
      return titleMatch || descMatch;
    });
    
    setFilteredProducts(filtered);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-20 pb-20"
    >
      {/* Search and Products Section */}
      <section className="py-6 bg-brand-blue/10">
        <div className="section-container py-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">
              Our Premium Products
            </h1>
            <SearchBar onSearch={handleSearch} />
          </div>
        
          {/* Product Grid - Moved inside the same section */}
          <div className="mt-8">
            {isLoading ? (
              <div className="text-center py-8">
                <h3 className="text-xl text-gray-600">Loading products...</h3>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <h3 className="text-xl text-gray-600">Error loading products. Please try again.</h3>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-8">
                <h3 className="text-xl text-gray-600">No products found. Try a different search term.</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    image={product.image}
                    price={product.price}
                    unit={product.unit}
                    description={product.description}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Benefits */}
      <section className="py-16 bg-brand-cream">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">
                Why Choose Our A2 Products?
              </h2>
              <div className="space-y-4">
                <div className="glass-panel p-4">
                  <h3 className="font-semibold mb-1">Immunity Booster</h3>
                  <p className="text-sm">Strengthens your immune system with its natural nutrients.</p>
                </div>
                <div className="glass-panel p-4">
                  <h3 className="font-semibold mb-1">Bone Strengthener</h3>
                  <p className="text-sm">Rich in calcium that supports strong bones and teeth development.</p>
                </div>
                <div className="glass-panel p-4">
                  <h3 className="font-semibold mb-1">Heart-Healthy</h3>
                  <p className="text-sm">Good for cardiovascular health and helps maintain cholesterol.</p>
                </div>
                <div className="glass-panel p-4">
                  <h3 className="font-semibold mb-1">Deeply Nourishing</h3>
                  <p className="text-sm">Provides essential nutrients for overall wellbeing.</p>
                </div>
                <div className="glass-panel p-4">
                  <h3 className="font-semibold mb-1">Easier to Digest</h3>
                  <p className="text-sm">A2 proteins are gentler on the digestive system.</p>
                </div>
                <div className="glass-panel p-4">
                  <h3 className="font-semibold mb-1">Rich in Nutrients</h3>
                  <p className="text-sm">Packed with essential vitamins and minerals.</p>
                </div>
              </div>
            </div>
            <div>
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
                <img 
                  src={sahiwal}
                  alt="A2 Sahiwal Cows" 
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="mt-4 text-sm text-center italic">
                Our Sahiwal cows are raised with love and care in a natural environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ordering Info */}
      <section className="py-16">
        <div className="section-container">
          <div className="glass-panel p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-semibold mb-6 text-center">
              How to Order
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-brand-red text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="font-medium mb-2">Call Us</h3>
                <p className="text-sm">
                  Call Mrs. Sarika Reddy at +91 9868220018 or S. Chandrasheker Reddy at +91 9701039748.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-brand-red text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="font-medium mb-2">Place Your Order</h3>
                <p className="text-sm">
                  Tell us what products you'd like to order and provide your delivery details.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-brand-red text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="font-medium mb-2">Receive at Home</h3>
                <p className="text-sm">
                  Enjoy home delivery of fresh dairy products right to your doorstep.
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm mb-2">
                <span className="font-semibold">Note:</span> Orders placed before 4 PM will be delivered the next day.
              </p>
              <p className="text-brand-red font-medium">
                Home Delivery Available!
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default Products;