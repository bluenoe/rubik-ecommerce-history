'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Gift, Zap, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { isValidEmail } from '@/lib/utils'

const benefits = [
  {
    icon: Gift,
    title: 'Exclusive Offers',
    description: 'Get 15% off your first order and access to member-only deals',
  },
  {
    icon: Zap,
    title: 'Early Access',
    description: 'Be the first to know about new product launches and restocks',
  },
  {
    icon: Bell,
    title: 'Cubing Tips',
    description: 'Receive weekly tutorials and speedcubing techniques from pros',
  },
]

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address.',
        variant: 'destructive',
      })
      return
    }

    if (!isValidEmail(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: 'Successfully subscribed!',
        description: 'Welcome to the RubikStore family. Check your email for a welcome gift!',
        variant: 'success',
      })
      
      setEmail('')
    } catch (error) {
      toast({
        title: 'Subscription failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-midnight via-gray-900 to-midnight text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-cyan/20 text-cyan border-cyan/30 mb-4">
              🎁 Join 50,000+ Cubers
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Stay in the <span className="gradient-text">Loop</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get exclusive access to new products, special offers, and cubing tips delivered straight to your inbox.
            </p>
          </motion.div>

          {/* Main Newsletter Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-2xl">
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Left Side - Form */}
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan to-coral rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          Get 15% Off Your First Order
                        </h3>
                        <p className="text-gray-300">
                          Plus exclusive cubing content
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan/50 focus:border-cyan text-white placeholder-gray-400 backdrop-blur-sm"
                          disabled={isLoading}
                        />
                        <Button
                          type="submit"
                          className="btn-primary px-8"
                          loading={isLoading}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Subscribing...' : 'Subscribe'}
                        </Button>
                      </div>
                      <p className="text-xs text-gray-400">
                        By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                      </p>
                    </form>
                  </div>

                  {/* Right Side - Benefits */}
                  <div className="space-y-6">
                    {benefits.map((benefit, index) => {
                      const Icon = benefit.icon
                      return (
                        <motion.div
                          key={benefit.title}
                          className="flex items-start space-x-4"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                        >
                          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="h-5 w-5 text-cyan" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white mb-1">
                              {benefit.title}
                            </h4>
                            <p className="text-sm text-gray-300">
                              {benefit.description}
                            </p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-400 text-sm">
              Join <span className="text-cyan font-semibold">50,000+</span> cubers who already get our newsletter
            </p>
            <div className="flex justify-center items-center space-x-2 mt-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan to-coral rounded-full" />
                </div>
              ))}
              <span className="text-gray-400 text-sm ml-2">and many more...</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}