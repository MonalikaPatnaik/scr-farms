import React from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShippingPolicy = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-20"
    >
      <section className="py-12 bg-brand-blue/10">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <Truck className="h-12 w-12 text-brand-red mr-4" />
              <h1 className="text-4xl md:text-5xl font-display font-bold">
                Shipping Policy
              </h1>
            </div>
            <p className="text-lg text-gray-700">
              Last Updated: April 18, 2025
            </p>
          </div>
        </div>
      </section>

      <section className="section-container">
        <article className="prose prose-lg max-w-4xl mx-auto space-y-8">
          <div className="bg-brand-blue/5 rounded-lg p-6">
            <h2 className="text-2xl font-display font-bold mb-4">1. Shipping Areas</h2>
            <p className="text-gray-700">
              We currently ship to the following locations:
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li className="text-gray-600">Andhra Pradesh</li>
                <li className="text-gray-600">Telangana</li>
                <li className="text-gray-600">Other states - contact us for availability</li>
              </ul>
            </p>
          </div>

          <div className="bg-brand-blue/5 rounded-lg p-6">
            <h2 className="text-2xl font-display font-bold mb-4">2. Shipping Methods</h2>
            <p className="text-gray-700">
              We offer the following shipping methods:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li className="text-gray-600">Standard Delivery - 3-5 business days</li>
              <li className="text-gray-600">Express Delivery - 1-2 business days (additional charges apply)</li>
            </ul>
          </div>

          <div className="bg-brand-blue/5 rounded-lg p-6">
            <h2 className="text-2xl font-display font-bold mb-4">3. Shipping Costs</h2>
            <p className="text-gray-700">
              Shipping costs vary based on:
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li className="text-gray-600">Order weight</li>
                <li className="text-gray-600">Shipping destination</li>
                <li className="text-gray-600">Shipping method chosen</li>
              </ul>
            </p>
            <p className="text-gray-600 mt-4">
              Free shipping is available for orders above ₹2000 within Andhra Pradesh.
            </p>
          </div>

          <div className="bg-brand-blue/5 rounded-lg p-6">
            <h2 className="text-2xl font-display font-bold mb-4">4. Delivery Time</h2>
            <p className="text-gray-700">
              Please allow:
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li className="text-gray-600">1-2 business days for order processing</li>
                <li className="text-gray-600">3-5 business days for standard delivery</li>
                <li className="text-gray-600">1-2 business days for express delivery</li>
              </ul>
            </p>
          </div>

          <div className="bg-brand-blue/5 rounded-lg p-6">
            <h2 className="text-2xl font-display font-bold mb-4">5. Shipping Updates</h2>
            <p className="text-gray-700">
              You will receive tracking information via email once your order is shipped.
              We recommend keeping your phone number and email address up to date.
            </p>
          </div>

          <div className="bg-brand-blue/5 rounded-lg p-6">
            <h2 className="text-2xl font-display font-bold mb-4">6. Delivery Location</h2>
            <p className="text-gray-700">
              Please ensure your delivery address is correct and accessible.
              We are not responsible for incorrect addresses provided by customers.
            </p>
          </div>
        </article>
      </section>
    </motion.main>
  );
};

export default ShippingPolicy;