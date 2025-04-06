import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch cart items
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ['cart', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id);
        
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Find product details for cart items
  const cartWithProducts = cartItems?.map(item => {
    const product = products.find(p => p.id.toString() === item.product_id);
    return {
      ...item,
      product
    };
  }) || [];

  // Calculate total
  const total = cartWithProducts.reduce((sum, item) => {
    return sum + (Number(item.product?.price || 0) * item.quantity);
  }, 0);

  // Update form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Process order
  const placeOrder = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("User not authenticated");
      
      // 1. Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total: total,
          status: 'pending'
        })
        .select('id')
        .single();
        
      if (orderError) throw orderError;
      
      // 2. Create order items
      const orderItems = cartWithProducts.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: Number(item.product?.price || 0)
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
        
      if (itemsError) throw itemsError;
      
      // 3. Clear the cart
      const { error: clearCartError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);
        
      if (clearCartError) throw clearCartError;
      
      return order.id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      toast({
        title: "Order placed successfully",
        description: "Thank you for your order!"
      });
      navigate('/');
    },
    onError: (error) => {
      toast({
        title: "Error processing order",
        description: "There was a problem placing your order. Please try again.",
        variant: "destructive"
      });
      console.error("Error placing order:", error);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    const { name, phone, address, city, state, zipCode } = formData;
    if (!name || !phone || !address || !city || !state || !zipCode) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Place the order
    try {
      await placeOrder.mutateAsync();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-28 pb-20 section-container flex justify-center">
        <p>Loading checkout...</p>
      </div>
    );
  }

  if (cartWithProducts.length === 0) {
    navigate('/cart');
    return null;
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
        <h1 className="text-3xl font-display font-bold mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass-panel p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter your state"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP Code</label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter your ZIP code"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-brand-red hover:bg-brand-red/90 mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </Button>
              </form>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartWithProducts.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <span className="font-medium">{item.product?.title}</span>
                      <span className="text-gray-500 block text-sm">
                        {item.quantity} x ₹{item.product?.price}
                      </span>
                    </div>
                    <span className="font-medium">
                      ₹{(Number(item.product?.price || 0) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-2 mb-4">
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
              
              <div className="text-sm text-gray-600">
                <p>Payment Method: Cash on Delivery</p>
                <p className="mt-2">Estimated Delivery: 1-2 business days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default Checkout;