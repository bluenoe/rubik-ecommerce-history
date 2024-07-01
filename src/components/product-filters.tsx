'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { formatPrice } from '@/lib/utils'

interface Category {
  id: string
  name: string
  slug: string
  productCount: number
}

interface ProductFiltersProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function ProductFilters({ selectedCategory, onCategoryChange }: ProductFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [priceRange, setPriceRange] = useState([0, 200])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [inStock, setInStock] = useState(false)
  const [onSale, setOnSale] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    brands: true,
    ratings: true,
    availability: true,
  })

  const brands = [
    'GAN',
    'MoYu',
    'QiYi',
    'YJ',
    'DaYan',
    'YuXin',
    'X-Man',
    'MoFang JiaoShi',
  ]

  const ratings = [5, 4, 3, 2, 1]

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    )
  }

  const clearAllFilters = () => {
    onCategoryChange('')
    setPriceRange([0, 200])
    setSelectedBrands([])
    setSelectedRatings([])
    setInStock(false)
    setOnSale(false)
  }

  const activeFiltersCount = [
    selectedCategory,
    priceRange[0] > 0 || priceRange[1] < 200,
    selectedBrands.length > 0,
    selectedRatings.length > 0,
    inStock,
    onSale,
  ].filter(Boolean).length

  const FilterSection = ({ 
    title, 
    isExpanded, 
    onToggle, 
    children 
  }: { 
    title: string
    isExpanded: boolean
    onToggle: () => void
    children: React.ReactNode 
  }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 px-4 -mx-4"
      >
        <h3 className="font-medium text-gray-900">{title}</h3>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="pb-4"
        >
          {children}
        </motion.div>
      )}
    </div>
  )

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                {activeFiltersCount} active
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-0">
        {/* Categories */}
        <FilterSection
          title="Categories"
          isExpanded={expandedSections.categories}
          onToggle={() => toggleSection('categories')}
        >
          <div className="space-y-2">
            <button
              onClick={() => onCategoryChange('')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                !selectedCategory
                  ? 'bg-cyan text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.slug)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${
                  selectedCategory === category.slug
                    ? 'bg-cyan text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span>{category.name}</span>
                <span className="text-xs opacity-75">
                  ({category.productCount})
                </span>
              </button>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection
          title="Price Range"
          isExpanded={expandedSections.price}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={200}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </FilterSection>

        {/* Brands */}
        <FilterSection
          title="Brands"
          isExpanded={expandedSections.brands}
          onToggle={() => toggleSection('brands')}
        >
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => handleBrandToggle(brand)}
                />
                <label
                  htmlFor={brand}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Ratings */}
        <FilterSection
          title="Customer Rating"
          isExpanded={expandedSections.ratings}
          onToggle={() => toggleSection('ratings')}
        >
          <div className="space-y-2">
            {ratings.map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={selectedRatings.includes(rating)}
                  onCheckedChange={() => handleRatingToggle(rating)}
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex items-center"
                >
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-3 w-3 ${
                          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-1">& up</span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection
          title="Availability"
          isExpanded={expandedSections.availability}
          onToggle={() => toggleSection('availability')}
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={inStock}
                onCheckedChange={setInStock}
              />
              <label
                htmlFor="in-stock"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                In Stock
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="on-sale"
                checked={onSale}
                onCheckedChange={setOnSale}
              />
              <label
                htmlFor="on-sale"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                On Sale
              </label>
            </div>
          </div>
        </FilterSection>
      </CardContent>
    </Card>
  )
}