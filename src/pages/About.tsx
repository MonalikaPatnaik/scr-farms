
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import sahiwal from '../../public/sahiwal.png';
import farm from '../../public/farm.png';

const About = () => {
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
              About SCR Agro Farms
            </h1>
            <p className="text-lg text-gray-700">
              We're dedicated to preserving traditional dairy farming methods while providing 
              the highest quality A2 dairy products to our customers.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl font-display font-bold mb-6">
                Our Story
              </h2>
              <p className="text-gray-700 mb-4">
                SCR Agro Farms was founded with a simple yet profound mission: to revive and preserve 
                traditional dairy farming methods that have been practiced in India for centuries.
              </p>
              <p className="text-gray-700 mb-4">
                Our journey began when the Reddy family decided to create a dairy farm that would prioritize 
                the well-being of animals, the quality of products, and the health of consumers. 
                We started with a small herd of indigenous Sahiwal cows, known for producing A2 milk.
              </p>
              <p className="text-gray-700 mb-4">
                Today, our farm in Gyrampalli, Annamaya District, continues to follow the traditional 
                Bilona method for making ghee and other dairy products. This labor-intensive process 
                preserves the nutritional benefits and authentic flavor that modern industrial methods often sacrifice.
              </p>
              <p className="text-gray-700">
                We take pride in delivering farm-fresh, chemical-free dairy products directly to our customers, 
                maintaining a personal connection with each family we serve.
              </p>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
                <img 
                  src={farm} 
                  alt="SCR Agro Farms" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-panel p-4 rounded-xl shadow-lg max-w-xs">
                <p className="text-sm italic">
                  "Our commitment to quality begins with how we raise our cows and extends to every product we deliver."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-brand-cream">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              These principles guide everything we do at SCR Agro Farms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              className="glass-panel p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-brand-red/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-brand-red" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-sm text-gray-600">
                We practice sustainable farming methods that respect the environment and ensure the 
                well-being of our animals.
              </p>
            </motion.div>

            <motion.div 
              className="glass-panel p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-brand-red/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-brand-red" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Quality</h3>
              <p className="text-sm text-gray-600">
                We never compromise on the quality of our products, following traditional methods 
                that preserve nutritional value.
              </p>
            </motion.div>

            <motion.div 
              className="glass-panel p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-brand-red/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-brand-red" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Care</h3>
              <p className="text-sm text-gray-600">
                We treat our animals with love and respect, ensuring they live healthy, stress-free lives 
                in a natural environment.
              </p>
            </motion.div>

            <motion.div 
              className="glass-panel p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-brand-red/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-brand-red" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Community</h3>
              <p className="text-sm text-gray-600">
                We believe in building relationships with our customers and supporting the local community through 
                sustainable business practices.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Cows */}
      <section className="py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
                <img 
                  src={sahiwal} 
                  alt="Sahiwal Cows" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {/* <div className="aspect-w-1 aspect-h-1 rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1546445317-29f4545e9d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                    alt="Cow grazing" 
                    className="object-cover w-full h-full"
                  />
                </div> */}
                {/* <div className="aspect-w-1 aspect-h-1 rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1527153619-3db94658e218?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                    alt="Cow closeup" 
                    className="object-cover w-full h-full"
                  />
                </div> */}
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-display font-bold mb-6">
                Our Sahiwal Cows
              </h2>
              <p className="text-gray-700 mb-4">
                The heart of SCR Agro Farms is our herd of indigenous Sahiwal cows. These gentle creatures 
                are one of India's most prized cattle breeds, known for producing A2 milk that's easier to digest 
                and more nutritious than regular milk.
              </p>
              <p className="text-gray-700 mb-4">
                Our cows graze freely on organic pastures and are fed a natural diet of organic fodder. 
                We never use antibiotics, hormones, or any artificial substances in their care.
              </p>
              <p className="text-gray-700 mb-4">
                The well-being of our cows is our top priority. Happy, healthy cows produce the best milk, 
                which is why we ensure they live in a stress-free environment with plenty of space to roam and graze.
              </p>
              <p className="text-gray-700 mb-6">
                Each cow is given a name and is treated as part of the family, receiving personal attention and care.
              </p>
              <Link to="/bilona-method">
                <Button className="bg-brand-red hover:bg-brand-red/90 text-white">
                  Learn About Our Process
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-16 bg-brand-blue/10">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-6">
              Visit Our Farm
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              We welcome visitors who want to see our farm operations and learn about traditional dairy farming. 
              Experience firsthand how we care for our cows and produce high-quality dairy products.
            </p>
            <div className="glass-panel p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold mb-4">Farm Location</h3>
              <p className="mb-4">
                SCR Agrofarms, NH-40, Gyrampalli, Annamaya Dist, AP-517213
              </p>
              <a 
                href="https://photos.app.goo.gl/HTgcZq32qB4sE9rM6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block text-brand-red hover:underline mb-4"
              >
                View on Google Maps
              </a>
              <p className="text-sm italic">
                Please call ahead to schedule your visit. We'd be happy to show you around!
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default About;
