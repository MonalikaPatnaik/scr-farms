
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Check, Truck, Star, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { products } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Find product by ID
  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <Button onClick={() => navigate('/products')}>Back to Products</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    // We would normally dispatch to a cart state manager here
    setIsAddedToCart(true);
    toast({
      title: "Added to cart",
      description: `${product.title} (${quantity}) has been added to your cart.`,
    });
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    toast({
      title: "Proceeding to checkout",
      description: `You are buying ${quantity} ${product.title}.`,
    });
    // Navigate to checkout or payment page
    // navigate('/checkout');
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-20"
    >
      <div className="section-container">
        <button 
          onClick={() => navigate('/products')}
          className="flex items-center text-gray-600 hover:text-brand-red mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="glass-panel p-4 rounded-2xl overflow-hidden">
                <div className="aspect-square relative overflow-hidden rounded-xl">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-brand-red text-white text-xs px-2 py-1 rounded-full">
                    A2 Sahiwal
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{product.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-brand-gold" fill="#F5C62A" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">(32 reviews)</span>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-brand-red">₹{product.price}</span>
              <span className="text-lg text-gray-600 ml-2">/ {product.unit}</span>
            </div>

            <p className="text-gray-700 mb-8">
              {product.fullDescription || product.description}
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-8">
              <h3 className="font-semibold text-lg">Benefits:</h3>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>100% organic from native Sahiwal cows</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Made using traditional Bilona method</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>No preservatives or additives</span>
              </div>
              <div className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Rich in nutrients and easy to digest</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-3">Quantity:</h3>
              <div className="flex items-center">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="border border-gray-300 rounded-l-lg px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <div className="border-t border-b border-gray-300 px-4 py-2">
                  {quantity}
                </div>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="border border-gray-300 rounded-r-lg px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="flex-1 bg-white border-2 border-brand-red text-brand-red hover:bg-brand-red/10"
                onClick={handleAddToCart}
                disabled={isAddedToCart}
              >
                {isAddedToCart ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button 
                size="lg" 
                className="flex-1 bg-brand-red hover:bg-brand-red/90 text-white"
                onClick={handleBuyNow}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Buy Now
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="glass-panel p-4 mb-6">
              <div className="flex items-start">
                <Truck className="h-5 w-5 text-brand-red mr-3 mt-0.5" />
                <div>
                  <h4 className="font-medium">Free Delivery</h4>
                  <p className="text-sm text-gray-600">Orders above ₹500</p>
                </div>
              </div>
            </div>

            {/* Wishlist Button */}
            <button className="flex items-center text-gray-600 hover:text-brand-red transition-colors">
              <Heart className="h-5 w-5 mr-2" />
              Add to Wishlist
            </button>
          </div>
        </div>

        {/* Product Description Tabs (could be expanded) */}
        <div className="mt-20">
          <h2 className="text-2xl font-display font-bold mb-6">Product Details</h2>
          <div className="glass-panel p-6">
            <h3 className="font-semibold text-lg mb-4">Description</h3>
            <p className="text-gray-700 mb-6">
              {product.fullDescription || `Our ${product.title} is sourced from our farm's Sahiwal cows, which are fed with organic fodder and raised in a natural environment. This product is made using the traditional Bilona method, which preserves all the natural goodness and flavor of the milk.`}
            </p>
            
            <h3 className="font-semibold text-lg mb-4">How to Use</h3>
            <p className="text-gray-700 mb-6">
              {product.usageInstructions || `Store in a cool, dry place. Once opened, refrigerate and consume within the recommended time for maximum freshness and flavor.`}
            </p>
            
            <h3 className="font-semibold text-lg mb-4">Ingredients</h3>
            <p className="text-gray-700">
              {product.ingredients || `100% A2 Sahiwal cow milk. No preservatives, additives, or artificial flavors.`}
            </p>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default ProductDetail;
