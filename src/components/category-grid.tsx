'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Zap, Trophy } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const categories = [
  {
    id: '3x3',
    name: '3x3 Cubes',
    description: 'Perfect for beginners and casual solvers',
    image: '/images/3x3-cube.jpg',
    icon: Star,
    color: 'from-blue-500 to-cyan-500',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    count: '50+ models',
    href: '/products?category=3x3',
    featured: true,
  },
  {
    id: '4x4',
    name: '4x4 Cubes',
    description: 'Challenge yourself with more complex puzzles',
    image: '/images/4x4-cube.jpg',
    icon: Trophy,
    color: 'from-purple-500 to-pink-500',
    textColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    count: '25+ models',
    href: '/products?category=4x4',
    featured: false,
  },
  {
    id: 'speedcubes',
    name: 'Speedcubes',
    description: 'Professional cubes for competitive solving',
    image: '/images/speedcube.jpg',
    icon: Zap,
    color: 'from-orange-500 to-red-500',
    textColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    count: '30+ models',
    href: '/products?category=speedcubes',
    featured: true,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Timers, mats, and maintenance tools',
    image: '/images/accessories.jpg',
    icon: Star,
    color: 'from-green-500 to-emerald-500',
    textColor: 'text-green-600',
    bgColor: 'bg-green-50',
    count: '40+ items',
    href: '/products?category=accessories',
    featured: false,
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export function CategoryGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <motion.div key={category.id} variants={itemVariants}>
            <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                {/* Category Image */}
                <div className={`h-48 bg-gradient-to-br ${category.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 left-4">
                    {category.featured && (
                      <Badge variant="coral" className="mb-2">
                        Popular
                      </Badge>
                    )}
                    <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${category.textColor}`} />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge variant="outline" className="bg-white/90 text-gray-700">
                      {category.count}
                    </Badge>
                  </div>
                  
                  {/* Placeholder for actual product image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/30 rounded-md" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                    
                    <Button
                      asChild
                      variant="outline"
                      className="w-full group-hover:bg-gray-900 group-hover:text-white transition-all duration-200"
                    >
                      <Link href={category.href} className="flex items-center justify-center">
                        Explore Collection
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        )
      })}
    </motion.div>
  )
}