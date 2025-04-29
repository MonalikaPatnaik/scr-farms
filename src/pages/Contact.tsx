
import React from 'react';
import { motion } from 'framer-motion';
import { PhoneCall, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would handle the form submission here
    
    toast({
      title: "Message Sent",
      description: "We've received your message and will get back to you soon!",
    });
    
    // Reset form
    e.currentTarget.reset();
  };
  
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-24 pb-20"
    >
      {/* Header Section */}
      <section className="py-12 bg-brand-blue/10">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-gray-700">
              Get in touch with SCR Agro Farms for orders, inquiries, or farm visits.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Details */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-display font-bold mb-6">
                Reach Out To Us
              </h2>
              
              <div className="space-y-8">
                <div className="glass-panel p-6 flex items-start">
                  <PhoneCall className="h-6 w-6 text-brand-red mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold mb-2">Phone</h3>
                    <p className="mb-1">Mrs. Sarika Reddy</p>
                    <p className="font-medium text-brand-red mb-2">+91 9868220018</p>
                    <p className="mb-1">S. Chandrasheker Reddy</p>
                    <p className="font-medium text-brand-red">+91 9701039748</p>
                  </div>
                </div>
                
                <div className="glass-panel p-6 flex items-start">
                  <Mail className="h-6 w-6 text-brand-red mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="font-medium text-brand-red">scragro79@gmail.com</p>
                    <p className="text-sm mt-2">We'll respond to your email within 24 hours</p>
                  </div>
                </div>
                
                <div className="glass-panel p-6 flex items-start">
                  <MapPin className="h-6 w-6 text-brand-red mt-1 mr-4" />
                  <div>
                    <h3 className="font-semibold mb-2">Address</h3>
                    <p className="mb-2">SCR Agrofarms, NH-40, Gyrampalli, Annamaya Dist, AP-517213</p>
                    <a 
                      href="https://photos.app.goo.gl/HTgcZq32qB4sE9rM6" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-red hover:underline text-sm"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-brand-red text-white rounded-xl">
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <p className="mb-1">Monday - Saturday: 8am - 8pm</p>
                <p className="mb-3">Sunday: 9am - 6pm</p>
                {/* <p className="mt-4 text-sm">
                  <span className="font-semibold">Note:</span> Orders placed before 4pm will be delivered the next day
                </p> */}
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-display font-bold mb-6">
                Send Us a Message
              </h2>
              
              <div className="glass-panel p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium">
                        Your Name
                      </label>
                      <Input 
                        id="name" 
                        placeholder="Enter your name" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="block text-sm font-medium">
                        Phone Number
                      </label>
                      <Input 
                        id="phone" 
                        placeholder="Enter your phone number" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email Address
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Enter your email" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium">
                      Subject
                    </label>
                    <Input 
                      id="subject" 
                      placeholder="What is this regarding?" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium">
                      Your Message
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Write your message here..." 
                      className="min-h-[150px]" 
                      required 
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-brand-red hover:bg-brand-red/90 text-white">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-display font-semibold mb-4">
                  Direct Ordering
                </h3>
                <p className="text-gray-700 mb-4">
                  For the fastest service, you can call us directly to place your order. 
                  Our team is ready to assist you with product information, pricing, and delivery details.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-brand-red hover:bg-brand-red/90 text-white">
                    <PhoneCall className="h-4 w-4 mr-2" />
                    Call to Order
                  </Button>
                  <Button variant="outline" className="border-brand-red text-brand-red hover:bg-brand-red/10">
                    View Product Prices
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-brand-cream">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Find answers to common questions about our products and services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="glass-panel p-6">
              <h3 className="font-semibold mb-2">How can I place an order?</h3>
              <p className="text-gray-700">
                You can place an order by calling us directly at the phone numbers listed above. 
                We'll be happy to assist you with your order and answer any questions.
              </p>
            </div>
            
            <div className="glass-panel p-6">
              <h3 className="font-semibold mb-2">Do you offer home delivery?</h3>
              <p className="text-gray-700">
                Yes, we offer home delivery services. Orders placed before 4 PM will be delivered the next day.
              </p>
            </div>
            
            <div className="glass-panel p-6">
              <h3 className="font-semibold mb-2">What areas do you deliver to?</h3>
              <p className="text-gray-700">
                We currently deliver to most areas within Annamaya District. Please call us to confirm if we deliver to your location.
              </p>
            </div>
            
            <div className="glass-panel p-6">
              <h3 className="font-semibold mb-2">Can I visit your farm?</h3>
              <p className="text-gray-700">
                Yes, we welcome visitors who want to learn about our farm and traditional dairy methods. 
                Please call ahead to schedule your visit.
              </p>
            </div>
            
            <div className="glass-panel p-6">
              <h3 className="font-semibold mb-2">How long do your products stay fresh?</h3>
              <p className="text-gray-700">
                Our milk products should be consumed within 1-2 days of delivery for optimal freshness. 
                Ghee has a much longer shelf life of several months when stored properly.
              </p>
            </div>
            
            <div className="glass-panel p-6">
              <h3 className="font-semibold mb-2">Do you offer bulk discounts?</h3>
              <p className="text-gray-700">
                Yes, we offer special pricing for bulk orders. Please contact us directly to discuss your requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default Contact;
