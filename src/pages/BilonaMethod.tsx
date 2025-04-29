
import React from 'react';
import { motion } from 'framer-motion';
import BenefitCard from '@/components/BenefitCard';
import { Heart, FlaskConical, Leaf, Clock } from 'lucide-react';
import cow from '../../public/cow.png';
import ghee from '../../public/ghee.png';
import curd from '../../public/curd.png';
import churn from '../../public/churn.png';
import packaging from '../../public/package.png';
import filter from '../../public/filter.png';

const BilonaMethod = () => {
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
              The Bilona Method
            </h1>
            <p className="text-lg text-gray-700">
              Discover the ancient traditional method we use to create our authentic A2 dairy products.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
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
                What is the Bilona Method?
              </h2>
              <p className="text-gray-700 mb-4">
                The Bilona Method is an ancient traditional technique for making ghee and other dairy products that 
                has been practiced in India for thousands of years. This method is mentioned in Ayurvedic texts 
                and has been passed down through generations.
              </p>
              <p className="text-gray-700 mb-4">
                Unlike modern industrial processes that prioritize speed and quantity, the Bilona Method focuses 
                on preserving the nutritional integrity and authentic flavor of dairy products through a slow, 
                careful process that honors the traditional wisdom of our ancestors.
              </p>
              <p className="text-gray-700">
                At SCR Agro Farms, we remain committed to this time-honored method because we believe that 
                the best dairy products come from the most authentic processes. While it's more labor-intensive 
                and time-consuming than modern methods, the superior quality of the final product makes it worthwhile.
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
                  src={packaging} 
                  alt="Traditional Bilona Method" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-panel p-4 rounded-xl shadow-lg max-w-xs">
                <p className="text-sm italic">
                  "The Bilona Method is more than a process—it's a connection to our heritage and a commitment to authenticity."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-16 bg-brand-cream">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              The Traditional Process
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our step-by-step approach to creating pure A2 dairy products using the Bilona Method
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-brand-red/20"></div>
            
            <div className="grid grid-cols-1 gap-12">
              {/* Step 1 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center">
                  <div className="absolute left-1/2 -ml-4 bg-brand-red rounded-full w-8 h-8 flex items-center justify-center text-white font-semibold">1</div>
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="font-display text-xl font-semibold mb-2">Milking the Cows</h3>
                    <p className="text-gray-700">
                      We begin by hand-milking our Sahiwal cows in a calm, clean environment. 
                      The milk is collected in traditional earthen or copper vessels.
                    </p>
                  </div>
                  <div className="w-1/2 pl-8">
                    <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
                      <img 
                        src={cow} 
                        alt="Milking cows" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 2 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center">
                  <div className="absolute left-1/2 -ml-4 bg-brand-red rounded-full w-8 h-8 flex items-center justify-center text-white font-semibold">2</div>
                  <div className="w-1/2 pr-8">
                    <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
                      <img 
                        src={curd}
                        alt="Curd setting" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 pl-8 text-left">
                    <h3 className="font-display text-xl font-semibold mb-2">Making Curd</h3>
                    <p className="text-gray-700">
                      The fresh milk is boiled and then cooled to room temperature. 
                      We add a small amount of natural curd culture (from the previous batch) 
                      and let it ferment overnight in traditional clay pots.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 3 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center">
                  <div className="absolute left-1/2 -ml-4 bg-brand-red rounded-full w-8 h-8 flex items-center justify-center text-white font-semibold">3</div>
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="font-display text-xl font-semibold mb-2">Churning</h3>
                    <p className="text-gray-700">
                      The next morning, the curd is churned using a traditional wooden churner (madhani) 
                      until butter separates from the buttermilk. This slow, rhythmic process is what 
                      gives the name "Bilona" to this method.
                    </p>
                  </div>
                  <div className="w-1/2 pl-8">
                    <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
                      <img 
                        src={churn} 
                        alt="Traditional churning" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 4 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center">
                  <div className="absolute left-1/2 -ml-4 bg-brand-red rounded-full w-8 h-8 flex items-center justify-center text-white font-semibold">4</div>
                  <div className="w-1/2 pr-8">
                    <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
                      <img 
                        src={ghee} 
                        alt="Making ghee" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 pl-8 text-left">
                    <h3 className="font-display text-xl font-semibold mb-2">Making Ghee</h3>
                    <p className="text-gray-700">
                      The freshly collected butter is then slowly heated in a traditional brass or 
                      earthen pot over a low flame. As it melts, the water evaporates and the milk 
                      solids separate. We continue the process until the ghee turns golden and has 
                      a rich aroma.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 5 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center">
                  <div className="absolute left-1/2 -ml-4 bg-brand-red rounded-full w-8 h-8 flex items-center justify-center text-white font-semibold">5</div>
                  <div className="w-1/2 pr-8 text-right">
                    <h3 className="font-display text-xl font-semibold mb-2">Filtering and Cooling</h3>
                    <p className="text-gray-700">
                      The ghee is carefully filtered to remove all milk solids, then allowed to cool naturally. 
                      This step is essential for achieving the perfect texture and preserving all the beneficial properties.
                    </p>
                  </div>
                  <div className="w-1/2 pl-8">
                    <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
                      <img 
                        src={filter}
                        alt="Filtering ghee" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Step 6 */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center">
                  <div className="absolute left-1/2 -ml-4 bg-brand-red rounded-full w-8 h-8 flex items-center justify-center text-white font-semibold">6</div>
                  <div className="w-1/2 pr-8">
                    <div className="aspect-w-4 aspect-h-3 rounded-xl overflow-hidden">
                      <img 
                        src={packaging}
                        alt="Packaging products" 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="w-1/2 pl-8 text-left">
                    <h3 className="font-display text-xl font-semibold mb-2">Packaging</h3>
                    <p className="text-gray-700">
                      Finally, the ghee is carefully packaged in premium glass containers that preserve its 
                      quality and flavor. Each batch is labeled with production date and batch number for quality control.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Benefits of the Bilona Method
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Why this traditional method creates superior dairy products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BenefitCard 
              icon={<FlaskConical className="h-8 w-8" />}
              title="Rich in Probiotics"
              description="The slow fermentation process allows beneficial bacteria to thrive, creating dairy products that are rich in probiotics for better digestion and gut health."
            />
            <BenefitCard 
              icon={<Heart className="h-8 w-8" />}
              title="Enhanced Nutrition"
              description="The gentle heating and traditional churning preserves the nutritional components of the milk, including essential fatty acids and fat-soluble vitamins."
            />
            <BenefitCard 
              icon={<Leaf className="h-8 w-8" />}
              title="Natural Preservation"
              description="No artificial additives or preservatives are needed. The traditional method naturally enhances shelf life while maintaining purity."
            />
            <BenefitCard 
              icon={<Clock className="h-8 w-8" />}
              title="Superior Taste and Texture"
              description="The clay pot fermentation and slow churning process creates a unique flavor profile and texture that cannot be replicated by modern industrial methods."
            />
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-brand-blue/10">
        <div className="section-container">
          <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12">
            <div className="text-center">
              <h3 className="text-2xl font-display font-semibold mb-6 text-brand-red">
                The Bilona Difference
              </h3>
              <p className="text-xl italic mb-8">
                "When you taste our ghee or buttermilk, you're experiencing the same authentic flavors that 
                have nourished generations of Indians. We believe that by preserving these traditional methods, 
                we're not just making dairy products—we're preserving a cultural heritage."
              </p>
              <p className="font-semibold">- Mrs. Sarika Reddy, Founder</p>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default BilonaMethod;
