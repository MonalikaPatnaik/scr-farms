
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from '@tanstack/react-query';

interface ProductCardProps {
  title: string;
  image: string;
  price: string;
  unit: string;
  description?: string;
  id: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image, price, unit, description, id }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleAddToCart = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to add items to your cart",
        variant: "destructive"
      });
      return;
    }

    try {
      // Check if the product is already in the cart
      const { data: existingCartItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('product_id', id.toString())
        .single();

      if (existingCartItem) {
        // Update quantity if already in cart
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingCartItem.quantity + 1, updated_at: new Date().toISOString() })
          .eq('id', existingCartItem.id);

        if (error) throw error;
      } else {
        // Add new item to cart
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: session.user.id,
            product_id: id.toString(),
            quantity: 1
          });

        if (error) throw error;
      }

      // Invalidate cart query to refresh the cart
      queryClient.invalidateQueries({ queryKey: ['cart'] });

      toast({
        title: "Added to cart",
        description: `${title} has been added to your cart.`,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "There was a problem adding the item to your cart.",
        variant: "destructive"
      });
    }
  };

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
              onClick={handleAddToCart}
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