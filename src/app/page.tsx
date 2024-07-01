'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star, Zap, Trophy, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RubikCube3D } from '@/components/rubik-cube-3d'
import { FeaturedProducts } from '@/components/featured-products'
import { CategoryGrid } from '@/components/category-grid'
import { TestimonialSection } from '@/components/testimonial-section'
import { NewsletterSection } from '@/components/newsletter-section'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const stats = [
  { icon: Users, label: 'Happy Customers', value: '50K+' },
  { icon: Star, label: 'Average Rating', value: '4.9' },
  { icon: Zap, label: 'Fast Shipping', value: '24h' },
  { icon: Trophy, label: 'Awards Won', value: '15+' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-blue-50" />
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <div className="space-y-4">
                <Badge className="bg-cyan/10 text-cyan border-cyan/20 hover:bg-cyan/20">
                  🎯 New Collection Available
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  Master the
                  <span className="gradient-text block">
                    Cube Revolution
                  </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                  Discover premium Rubik's cubes, speedcubes, and accessories. 
                  From beginner-friendly 3x3s to professional competition gear.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="btn-primary group">
                  <Link href="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 hover:bg-gray-50">
                  <Link href="/playground">
                    Try 3D Demo
                  </Link>
                </Button>
              </div>
              
              {/* Stats */}
              <motion.div
                className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeInUp}
                    className="text-center lg:text-left"
                  >
                    <div className="flex items-center justify-center lg:justify-start mb-2">
                      <stat.icon className="h-5 w-5 text-cyan mr-2" />
                      <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                    </div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* 3D Rubik's Cube */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan/20 to-coral/20 rounded-full blur-3xl" />
                <RubikCube3D />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan/10 rounded-full animate-float" />
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-coral/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-400/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </section>
      
      {/* Category Grid */}
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
              Shop by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect cube for your skill level and style
            </p>
          </motion.div>
          <CategoryGrid />
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Featured</span> Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked cubes loved by speedcubers worldwide
            </p>
          </motion.div>
          <FeaturedProducts />
        </div>
      </section>
      
      {/* Testimonials */}
      <TestimonialSection />
      
      {/* Newsletter */}
      <NewsletterSection />
      
      <Footer />
    </div>
  )
}