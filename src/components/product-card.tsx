'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/store/cart-store'
import { useToast } from '@/hooks/use-toast'
import { formatPrice, calculateDiscount } from '@/lib/utils'

interface Product {
  id: string
  name: string
  slug: string
  description?: string
  price: number
  comparePrice?: number
  images: string[]
  category: {
    id: string
    name: string
    slug: string
  }
  avgRating: number
  reviewCount: number
  featured: boolean
  inventory: number
}

interface ProductCardProps {
  product: Product
  viewMode?: 'grid' | 'list'
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addItem } = useCart()
  const { toast } = useToast()

  const discount = product.comparePrice
    ? calculateDiscount(product.comparePrice, product.price)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (product.inventory <= 0) {
      toast({
        title: 'Out of stock',
        description: 'This product is currently out of stock.',
        variant: 'destructive',
      })
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '/placeholder-cube.jpg',
      slug: product.slug,
    })

    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
      variant: 'success',
    })
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
    
    toast({
      title: isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      description: `${product.name} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
      variant: 'success',
    })
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : i < rating
                ? 'fill-yellow-200 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">
          ({product.reviewCount})
        </span>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <Link href={`/products/${product.slug}`}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-0">
              <div className="flex">
                {/* Image */}
                <div className="relative w-48 h-48 flex-shrink-0">
                  <Image
                    src={product.images[currentImageIndex] || '/placeholder-cube.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.featured && (
                      <Badge className="bg-coral text-white">
                        Featured
                      </Badge>
                    )}
                    {discount > 0 && (
                      <Badge className="bg-red-500 text-white">
                        -{discount}%
                      </Badge>
                    )}
                    {product.inventory <= 0 && (
                      <Badge variant="destructive">
                        Out of Stock
                      </Badge>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={handleWishlistToggle}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                      }`}
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Badge variant="outline" className="mb-2">
                        {product.category.name}
                      </Badge>
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mb-3">
                    {renderStars(product.avgRating)}
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                      {product.comparePrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(product.comparePrice)}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddToCart}
                        disabled={product.inventory <= 0}
                      >
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/products/${product.slug}`}>
        <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-0">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.images[currentImageIndex] || '/placeholder-cube.jpg'}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setCurrentImageIndex(index)
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {product.featured && (
                  <Badge className="bg-coral text-white">
                    Featured
                  </Badge>
                )}
                {discount > 0 && (
                  <Badge className="bg-red-500 text-white">
                    -{discount}%
                  </Badge>
                )}
                {product.inventory <= 0 && (
                  <Badge variant="destructive">
                    Out of Stock
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={handleWishlistToggle}
                  className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${
                      isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    // Quick view functionality can be added here
                  }}
                  className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Eye className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              {/* Quick Add to Cart */}
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.inventory <= 0}
                  className="w-full btn-primary"
                  size="sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <Badge variant="outline" className="mb-2 text-xs">
                {product.category.name}
              </Badge>
              
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>
              
              {/* Rating */}
              <div className="mb-3">
                {renderStars(product.avgRating)}
              </div>
              
              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>
                
                {product.inventory <= 5 && product.inventory > 0 && (
                  <span className="text-xs text-orange-600 font-medium">
                    Only {product.inventory} left
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}