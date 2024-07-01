'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const testimonials = [
  {
    id: 1,
    name: 'Alex Chen',
    role: 'Speedcubing Champion',
    avatar: '/avatars/alex-chen.jpg',
    rating: 5,
    content: 'RubikStore has the best selection of speedcubes I\'ve ever seen. The GAN 356 X I bought here helped me achieve my personal best of 8.2 seconds!',
    product: 'GAN 356 X',
    location: 'California, USA',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Cube Enthusiast',
    avatar: '/avatars/sarah-johnson.jpg',
    rating: 5,
    content: 'As a beginner, I was overwhelmed by choices. The customer service team helped me pick the perfect starter cube. Now I\'m solving in under 2 minutes!',
    product: 'MoYu RS3 M',
    location: 'London, UK',
  },
  {
    id: 3,
    name: 'Marcus Rodriguez',
    role: 'Competition Judge',
    avatar: '/avatars/marcus-rodriguez.jpg',
    rating: 5,
    content: 'I\'ve been cubing for 15 years and RubikStore consistently delivers quality products. Their speedcubes are tournament-grade and arrive perfectly set up.',
    product: 'QiYi Valk 4 M',
    location: 'Madrid, Spain',
  },
  {
    id: 4,
    name: 'Emily Zhang',
    role: 'Math Teacher',
    avatar: '/avatars/emily-zhang.jpg',
    rating: 5,
    content: 'I use cubes in my classroom to teach problem-solving. RubikStore\'s educational discounts and bulk orders make it affordable for schools.',
    product: 'Educational Bundle',
    location: 'Toronto, Canada',
  },
  {
    id: 5,
    name: 'David Kim',
    role: 'Collector',
    avatar: '/avatars/david-kim.jpg',
    rating: 5,
    content: 'The rare and limited edition cubes here are amazing. I\'ve built my entire collection through RubikStore. Fast shipping and perfect packaging every time.',
    product: 'Limited Edition Collection',
    location: 'Seoul, South Korea',
  },
  {
    id: 6,
    name: 'Lisa Thompson',
    role: 'Parent',
    avatar: '/avatars/lisa-thompson.jpg',
    rating: 5,
    content: 'My 12-year-old son is obsessed with cubing. RubikStore has everything from beginner cubes to advanced accessories. Great quality and fair prices.',
    product: 'Beginner Starter Pack',
    location: 'Sydney, Australia',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export function TestimonialSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            What Our <span className="gradient-text">Cubers</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust RubikStore for their cubing needs
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Quote Icon */}
                    <div className="flex justify-between items-start">
                      <Quote className="h-8 w-8 text-cyan/30" />
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className="text-gray-700 leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Product Mentioned */}
                    <div className="text-sm text-cyan font-medium">
                      Product: {testimonial.product}
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback className="bg-gradient-to-br from-cyan to-coral text-white font-semibold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testimonial.role}
                        </div>
                        <div className="text-xs text-gray-400">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { label: 'Happy Customers', value: '50,000+' },
            { label: 'Products Sold', value: '200,000+' },
            { label: 'Countries Served', value: '80+' },
            { label: 'Average Rating', value: '4.9/5' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}