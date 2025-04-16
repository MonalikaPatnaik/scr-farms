// paymentRoutes.js - Handle Razorpay payment integration
import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const router = express.Router();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, notes } = req.body;
    
    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }
    
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt,
      notes
    };
    
    const order = await razorpay.orders.create(options);
    
    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Verify Razorpay payment
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      order_id
    } = req.body;
    
    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');
    
    const isAuthentic = expectedSignature === razorpay_signature;
    
    if (isAuthentic) {
      // Update order status in Supabase
      if (order_id) {
        const { error } = await supabase
          .from('orders')
          .update({
            status: 'paid',
            payment_id: razorpay_payment_id,
            payment_order_id: razorpay_order_id,
            payment_signature: razorpay_signature,
            updated_at: new Date()
          })
          .eq('id', order_id);
        
        if (error) {
          console.error('Error updating order status:', error);
          return res.status(500).json({
            success: false,
            error: 'Failed to update order status'
          });
        }
      }
      
      res.status(200).json({
        success: true,
        message: 'Payment verified successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        error: 'Invalid signature'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get payment details
router.get('/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    const payment = await razorpay.payments.fetch(paymentId);
    
    res.status(200).json({
      success: true,
      payment
    });
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Helper function to find order by payment ID
async function findOrderByPaymentId(paymentId) {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('payment_id', paymentId);
  
  if (error) {
    console.error('Error finding order:', error);
    return null;
  }
  
  return orders && orders.length > 0 ? orders[0] : null;
}

// Helper function to update order status
async function updateOrderStatus(orderId, status) {
  const { error } = await supabase
    .from('orders')
    .update({
      status,
      updated_at: new Date()
    })
    .eq('id', orderId);
  
  if (error) {
    console.error(`Error updating order to ${status}:`, error);
    return false;
  }
  
  return true;
}

// Helper function to handle payment authorized event
async function handlePaymentAuthorized(payment) {
  const order = await findOrderByPaymentId(payment.entity.id);
  if (order) {
    await updateOrderStatus(order.id, 'paid');
  }
}

// Helper function to handle payment failed event
async function handlePaymentFailed(payment) {
  const order = await findOrderByPaymentId(payment.entity.id);
  if (order) {
    await updateOrderStatus(order.id, 'failed');
  }
}

// Webhook to handle payment events from Razorpay
router.post('/webhook', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    
    // Verify webhook signature
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const shasum = crypto.createHmac('sha256', webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');
    
    if (digest !== signature) {
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }
    
    const { event, payload } = req.body;
    
    // Handle different webhook events
    switch (event) {
      case 'payment.authorized':
        await handlePaymentAuthorized(payload.payment);
        break;
      case 'payment.failed':
        await handlePaymentFailed(payload.payment);
        break;
      // Add more event handlers as needed
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
