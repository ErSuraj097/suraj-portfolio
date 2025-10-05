'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Zap, DollarSign } from 'lucide-react';

interface SuccessStory {
  _id: string;
  title: string;
  description: string;
  metric: string;
  icon?: string;
  category: string;
}

const SuccessStories = () => {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    'Performance': TrendingUp,
    'Cost Reduction': DollarSign,
    'User Growth': Users,
    'Efficiency': Zap,
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/success-stories');
      const data = await response.json();
      setStories(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching success stories:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="success" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-dark"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white/30 mx-auto"></div>
            <p className="mt-4 text-white/70">Loading success stories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="success" className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 gradient-dark"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text-secondary mb-4">Success Stories</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Measurable results and impact from my projects, showcasing the value 
            delivered to clients and users.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stories.map((story, index) => {
            const IconComponent = iconMap[story.category as keyof typeof iconMap] || TrendingUp;
            
            return (
              <motion.div
                key={story._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 glass rounded-xl hover:scale-105 hover:glow transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 gradient-primary rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 glow">
                  <IconComponent className="text-white" size={24} />
                </div>
                
                <h3 className="text-3xl font-bold gradient-text-accent mb-2">{story.metric}</h3>
                <h4 className="text-lg font-semibold text-white mb-2">{story.title}</h4>
                <p className="text-white/70 text-sm">{story.description}</p>
                
                <div className="mt-4">
                  <span className="px-3 py-1 glass rounded-full text-xs font-medium text-white/90 border border-white/20">
                    {story.category}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {stories.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-white/70">No success stories available at the moment.</p>
          </div>
        )}

        {/* Default success stories if no data */}
        {stories.length === 0 && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                metric: '50%',
                title: 'Performance Boost',
                description: 'Improved application response time through optimization',
                category: 'Performance',
                icon: TrendingUp
              },
              {
                metric: '30%',
                title: 'Cost Reduction',
                description: 'Reduced infrastructure costs with efficient architecture',
                category: 'Cost Reduction',
                icon: DollarSign
              },
              {
                metric: '2M+',
                title: 'Users Served',
                description: 'Scalable systems handling millions of concurrent users',
                category: 'User Growth',
                icon: Users
              },
              {
                metric: '75%',
                title: 'Faster Deployment',
                description: 'Streamlined CI/CD pipeline reducing deployment time',
                category: 'Efficiency',
                icon: Zap
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 glass rounded-xl hover:scale-105 hover:glow transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 gradient-primary rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 glow">
                  <story.icon className="text-white" size={24} />
                </div>
                
                <h3 className="text-3xl font-bold gradient-text-accent mb-2">{story.metric}</h3>
                <h4 className="text-lg font-semibold text-white mb-2">{story.title}</h4>
                <p className="text-white/70 text-sm">{story.description}</p>
                
                <div className="mt-4">
                  <span className="px-3 py-1 glass rounded-full text-xs font-medium text-white/90 border border-white/20">
                    {story.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessStories;