import React from 'react';
import { motion } from 'framer-motion';
import { X, DollarSign, Clock, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const CancellationsAndRefunds = () => {
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
              <X className="h-12 w-12 text-brand-red mr-4" />
              <h1 className="text-4xl md:text-5xl font-display font-bold">
                Cancellations & Refunds
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
            <h2 className="text-2xl font-display font-bold mb-4">Order Cancellation</h2>
            <p className="text-gray-700">
              Customers can cancel their orders before the shipment process begins.
            </p>
            <p className="text-gray-700">
              To request a cancellation, contact our customer support at 
              <a href="mailto:scragro79@gmail.com" className="text-brand-red hover:text-brand-red-dark">
                 scragro79@gmail.com 
              </a>
               with your order details.
            </p>
            <p className="text-gray-700">
              If the order has already been dispatched, cancellation requests will not be accepted.
            </p>
          </div>

          <div className="bg-brand-blue/5 rounded-lg p-6">
            <h2 className="text-2xl font-display font-bold mb-4">Return Policy</h2>
            <p className="text-gray-700">
              Due to the perishable nature of dairy products, returns are only accepted in cases where:
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li className="text-gray-600">The product is damaged during transit.</li>
                <li className="text-gray-600">The wrong product has been delivered.</li>
                <li className="text-gray-600">The product is expired at the time of delivery.</li>
              </ul>
            </p>
            <p className="text-gray-700">
              Customers must report any such issues within 24 hours of delivery with supporting images.
              Once the return request is approved, the product must be returned in its original packaging.
            </p>
          </div>

          <div className="bg-brand-blue/5 rounded-lg p-6">
            <h2 className="text-2xl font-display font-bold mb-4">Refund Policy</h2>
            <p className="text-gray-700">
              If a refund request is approved, the amount will be processed within 7-10 business days to the original payment method.
            </p>
            <p className="text-gray-700">
              Refunds will only be granted under the following circumstances:
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li className="text-gray-600">Canceled orders before shipment.</li>
                <li className="text-gray-600">Approved returns due to damaged, incorrect, or expired products.</li>
                <li className="text-gray-600">Failed transactions where the amount was deducted but the order was not confirmed.</li>
              </ul>
            </p>
            <p className="text-gray-700">
              MilkDelights reserves the right to deny refund requests that do not meet the conditions mentioned.
            </p>
          </div>

          <div className="bg-brand-blue/5 rounded-lg p-6">
            <h2 className="text-2xl font-display font-bold mb-4">Exchange Policy</h2>
            <p className="text-gray-700">
              We do not offer exchanges for any products. However, customers may request a refund or replacement for eligible items as per the return policy.
            </p>
          </div>

          <div className="bg-brand-blue/5 rounded-lg p-6">
            <h2 className="text-2xl font-display font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700">
              For any refund, cancellation, or return-related queries, please reach out to us at:
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li className="text-gray-600">
                  <Mail className="h-4 w-4 inline-block mr-2" />
                  <a href="mailto:scragro79@gmail.com" className="text-brand-red hover:text-brand-red-dark">
                    scragro79@gmail.com
                  </a>
                </li>
                <li className="text-gray-600">
                  <Phone className="h-4 w-4 inline-block mr-2" />
                  +91 9701039748
                </li>
              </ul>
            </p>
          </div>
        </article>
      </section>
    </motion.main>
  );
};

export default CancellationsAndRefunds;