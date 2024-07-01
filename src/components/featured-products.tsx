'use client'

import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCart } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils'
import { useState } from 'react'

const featuredProducts = [
  {
    id: '1',
    name: 'GAN 356 X',
    brand: 'GAN',
    price: 59.99,
    originalPrice: 69.99,
    rating: 4.9,
    reviews: 234,
    image: '/images/gan-356x.jpg',
    category: 'Speedcube',
    isNew: false,
    isBestseller: true,
    description: 'Professional magnetic speedcube with customizable tension',
    features: ['Magnetic positioning', 'Adjustable elasticity', 'IPG v5 core'],
  },
  {
    id: '2',
    name: 'MoYu RS3 M 2020',
    brand: 'MoYu',
    price: 12.99,
    originalPrice: null,
    rating: 4.7,
    reviews: 189,
    image: '/images/moyu-rs3m.jpg',
    category: '3x3',
    isNew: true,
    isBestseller: false,
    description: 'Budget-friendly magnetic cube perfect for beginners',
    features: ['Magnetic positioning', 'Smooth turning', 'Great value'],
  },
  {
    id: '3',
    name: 'QiYi Valk 4 M',
    brand: 'QiYi',
    price: 34.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 156,
    image: '/images/qiyi-valk4m.jpg',
    category: '4x4',
    isNew: false,
    isBestseller: true,
    description: 'Premium 4x4 speedcube with magnetic positioning',
    features: ['Magnetic positioning', 'Stable mechanism', 'Competition ready'],
  },
  {
    id: '4',
    name: 'YJ MGC Elite',
    brand: 'YJ',
    price: 24.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 98,
    image: '/images/yj-mgc-elite.jpg',
    category: 'Speedcube',
    isNew: true,
    isBestseller: false,
    description: 'High-performance cube with dual adjustment system',
    features: ['Dual adjustment', 'UV coating', 'Premium feel'],
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

export function FeaturedProducts() {
  const { addItem } = useCart()
  const [wishlist, setWishlist] = useState<string[]>([])

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {featuredProducts.map((product) => {
        const discount = product.originalPrice 
          ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
          : 0

        return (
          <motion.div key={product.id} variants={itemVariants}>
            <Card className="group h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge variant="cyan" className="text-xs">
                        New
                      </Badge>
                    )}
                    {product.isBestseller && (
                      <Badge variant="coral" className="text-xs">
                        Bestseller
                      </Badge>
                    )}
                    {discount > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        -{discount}%
                      </Badge>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white transition-all duration-200"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 transition-colors ${
                        wishlist.includes(product.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </Button>

                  {/* Placeholder Product Image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white rounded-lg shadow-lg flex items-center justify-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-cyan/20 to-coral/20 rounded-md" />
                    </div>
                  </div>

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Eye className="h-4 w-4 mr-1" />
                        Quick View
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Brand & Category */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="font-medium">{product.brand}</span>
                      <span>{product.category}</span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-cyan transition-colors">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full btn-primary group/btn"
                      size="sm"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2 transition-transform group-hover/btn:scale-110" />
                      Add to Cart
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