
import React from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types/products';

interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

const Cart = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch cart items
  const { data: cartItems, isLoading, error } = useQuery<CartItem[]>({
    queryKey: ['cart', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);
        
      if (error) throw error;
      return data as CartItem[];
    },
    enabled: !!user,
  });

  // Fetch product details
  const { data: products } = useQuery<Product[]>({
    queryKey: ['products-for-cart'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*');
        
      if (error) throw error;
      return data as Product[];
    },
  });

  // Mutation for updating cart item quantity
  const updateQuantity = useMutation({
    mutationFn: async ({ id, quantity }: { id: string, quantity: number }) => {
      const { error } = await supabase
        .from('cart_items')
        .update({ 
          quantity, 
          updated_at: new Date().toISOString() 
        })
        .eq('id', id);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive"
      });
      console.error("Error updating quantity:", error);
    }
  });

  // Mutation for removing cart item
  const removeFromCart = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive"
      });
      console.error("Error removing item:", error);
    }
  });

  // Find product details for cart items
  const cartWithProducts = cartItems?.map(item => {
    const product = products?.find(p => p.id === item.product_id || p.id.toString() === item.product_id);
    return {
      ...item,
      product
    };
  }) || [];

  // Calculate total
  const total = cartWithProducts.reduce((sum, item) => {
    return sum + (Number(item.product?.price || 0) * item.quantity);
  }, 0);

  const handleIncreaseQuantity = (item: CartItem) => {
    updateQuantity.mutate({ id: item.id, quantity: item.quantity + 1 });
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item.quantity > 1) {
      updateQuantity.mutate({ id: item.id, quantity: item.quantity - 1 });
    } else {
      removeFromCart.mutate(item.id);
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart.mutate(id);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (isLoading) {
    return (
      <div className="pt-28 pb-20 section-container flex justify-center">
        <p>Loading your cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-28 pb-20 section-container">
        <p className="text-red-500">Error loading your cart. Please try again.</p>
      </div>
    );
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-28 pb-20"
    >
      <div className="section-container">
        <h1 className="text-3xl font-display font-bold mb-8">Your Cart</h1>
        
        {cartWithProducts.length === 0 ? (
          <div className="glass-panel p-8 text-center">
            <p className="mb-6">Your cart is empty</p>
            <Button asChild className="bg-brand-red hover:bg-brand-red/90">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="glass-panel divide-y">
                {cartWithProducts.map((item) => (
                  item.product && (
                    <div key={item.id} className="p-4 flex flex-col sm:flex-row gap-4">
                      <div className="h-24 w-24 flex-shrink-0">
                        <img 
                          src={item.product?.image} 
                          alt={item.product?.title} 
                          className="h-full w-full object-cover rounded-md"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-medium">{item.product?.title}</h3>
                        <p className="text-sm text-gray-500">₹{item.product?.price} / {item.product?.unit}</p>
                        
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            <button 
                              onClick={() => handleDecreaseQuantity(item)}
                              className="p-1 rounded-full border hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="mx-2">{item.quantity}</span>
                            <button 
                              onClick={() => handleIncreaseQuantity(item)}
                              className="p-1 rounded-full border hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <div className="flex items-center">
                            <p className="font-semibold mr-4">
                              ₹{(Number(item.product?.price || 0) * item.quantity).toFixed(2)}
                            </p>
                            <button 
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="glass-panel p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹0.00</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-brand-red hover:bg-brand-red/90"
                  onClick={handleCheckout}
                  disabled={cartWithProducts.length === 0}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Proceed to Checkout
                </Button>
                
                <div className="mt-4 text-center">
                  <Link to="/products" className="text-brand-red hover:underline text-sm">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.main>
  );
};

export default Cart;