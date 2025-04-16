import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Define order status colors
const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-500',
  paid: 'bg-green-500',
  shipped: 'bg-blue-500',
  delivered: 'bg-green-700',
  failed: 'bg-red-500'
};

const Orders: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch user's orders with order items
  const { 
    data: orders, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      if (!user) return [];

      // Fetch orders with their items
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id, 
          total, 
          status, 
          created_at,
          order_items (
            id, 
            product_id, 
            quantity, 
            price
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user
  });

  if (isLoading) {
    return (
      <div className="pt-28 pb-20 section-container flex justify-center">
        <p>Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-28 pb-20 section-container flex justify-center text-red-500">
        <p>Error loading orders: {error.message}</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="pt-28 pb-20 section-container flex flex-col items-center">
        <p className="mb-4">You haven't placed any orders yet.</p>
        <Button onClick={() => navigate('/')}>
          Continue Shopping
        </Button>
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
        <h1 className="text-3xl font-display font-bold mb-8">My Orders</h1>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead>Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const orderDate = new Date(order.created_at);
              const totalItems = order.order_items.reduce(
                (sum, item) => sum + item.quantity, 
                0
              );

              return (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>
                    {orderDate.toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>₹{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge 
                      className={`${STATUS_COLORS[order.status] || 'bg-gray-500'} text-white`}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  {/* <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      View Details
                    </Button>
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </motion.main>
  );
};

export default Orders;