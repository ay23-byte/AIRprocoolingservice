'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Wind, Wrench, Phone, MessageCircle, CheckCircle2, ArrowRight, Droplets, Star, MapPin, Clock, Zap, AlertCircle, ChevronDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { businessConfig } from '@/config/business'

const iconMap: { [key: string]: React.ReactNode } = {
  Wind: <Wind className='w-8 h-8' />,
  Wrench: <Wrench className='w-8 h-8' />,
  Droplets: <Droplets className='w-8 h-8' />,
}

export default function AirProCoolingService() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  
  const { contact, business, services, pricing, features, reviews, serviceAreas, faqs, images, trustBadges } = businessConfig
  const whatsappBase = `https://wa.me/91${contact.phone}`

  return (
    <div className='min-h-screen bg-white text-gray-900'>
      {/* Hero Section */}
      <section className='relative px-6 md:px-16 py-20 grid md:grid-cols-2 gap-10 items-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white'>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className='flex items-center gap-2 mb-4'>
            <Star className='w-5 h-5 fill-yellow-300' />
            <span className='text-yellow-300 font-semibold'>{business.rating} Rating • {business.reviews}+ Reviews</span>
          </div>
          <h1 className='text-4xl md:text-6xl font-bold leading-tight'>{business.name}</h1>
          <p className='mt-4 text-lg md:text-xl opacity-90'>{business.description}</p>
          
          <div className='mt-6 space-y-3'>
            <div className='flex items-center gap-3'>
              <Zap className='w-5 h-5' />
              <span>Same-Day Service Available</span>
            </div>
            <div className='flex items-center gap-3'>
              <Clock className='w-5 h-5' />
              <span>24/7 Booking Available</span>
            </div>
            <div className='flex items-center gap-3'>
              <CheckCircle2 className='w-5 h-5' />
              <span>{business.experience} Years Experience • {business.customers} Customers</span>
            </div>
          </div>

          <div className='mt-8 flex gap-4 flex-wrap'>
            <Button asChild className='rounded-full px-8 py-6 text-lg bg-yellow-400 text-black hover:bg-yellow-300 font-bold'>
              <a href={`${whatsappBase}?text=${encodeURIComponent(contact.whatsappMessage)}`} target='_blank' rel='noreferrer'>
                <MessageCircle className='mr-2 w-5 h-5' /> Book on WhatsApp
              </a>
            </Button>
            <Button asChild variant='outline' className='rounded-full px-8 py-6 text-lg border-white text-white hover:bg-white/10'>
              <a href={`tel:+91${contact.phone}`}>
                <Phone className='mr-2 w-5 h-5' /> Call Now
              </a>
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={images.hero}
            className='rounded-3xl shadow-2xl w-full h-[420px] object-cover'
          />
        </motion.div>
      </section>

      {/* Quick Contact Cards */}
      <section className='px-6 md:px-16 py-12 grid md:grid-cols-3 gap-6 bg-gray-50'>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className='bg-white p-6 rounded-2xl shadow-lg text-center'>
          <Phone className='w-10 h-10 mx-auto mb-3 text-blue-600' />
          <h3 className='font-bold text-lg mb-2'>Call Us</h3>
          <a href={`tel:+91${contact.phone}`} className='text-blue-600 font-bold text-xl hover:underline'>
            {contact.phone}
          </a>
          <p className='text-gray-600 text-sm mt-2'>Available 24/7</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className='bg-white p-6 rounded-2xl shadow-lg text-center'>
          <MessageCircle className='w-10 h-10 mx-auto mb-3 text-green-600' />
          <h3 className='font-bold text-lg mb-2'>WhatsApp</h3>
          <a href={`${whatsappBase}?text=${encodeURIComponent(contact.whatsappMessage)}`} target='_blank' rel='noreferrer' className='text-green-600 font-bold text-xl hover:underline'>
            Message Us
          </a>
          <p className='text-gray-600 text-sm mt-2'>Fast Response</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className='bg-white p-6 rounded-2xl shadow-lg text-center'>
          <Clock className='w-10 h-10 mx-auto mb-3 text-orange-600' />
          <h3 className='font-bold text-lg mb-2'>Emergency Service</h3>
          <p className='font-bold text-orange-600'>Same-Day Service</p>
          <p className='text-gray-600 text-sm mt-2'>Available anytime</p>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className='px-6 md:px-16 py-20 bg-white'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-4'>AC Services & Pricing</h2>
        <p className='text-center text-gray-600 mb-12 max-w-2xl mx-auto'>Multiple service options with transparent pricing and verified technician ratings</p>
        
        {services.map((service, idx) => (
          <div key={idx} className='mb-16'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className='flex items-center gap-4 mb-8'
            >
              <div className='text-blue-600 text-4xl'>{iconMap[service.icon]}</div>
              <div>
                <h3 className='text-2xl font-bold'>{service.title}</h3>
                <p className='text-gray-600'>{service.description}</p>
              </div>
            </motion.div>

            <div className='grid md:grid-cols-2 gap-6'>
              {service.tiers.map((tier, tierIdx) => (
                <motion.div
                  key={tierIdx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: tierIdx * 0.1 }}
                  className='bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition'
                >
                  <div className='flex items-start justify-between mb-3'>
                    <h4 className='text-xl font-bold text-gray-900'>{tier.name}</h4>
                    {(tier as any).badge && (
                      <span className='bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full'>
                        {(tier as any).badge}
                      </span>
                    )}
                  </div>

                  <div className='mb-4'>
                    <div className='flex items-baseline gap-2'>
                      <span className='text-3xl font-bold text-blue-600'>₹{tier.price}</span>
                      {tier.originalPrice && (
                        <>
                          <span className='text-lg line-through text-gray-500'>₹{tier.originalPrice}</span>
                          <span className='text-sm font-bold text-red-600'>
                            {Math.round(((tier.originalPrice - tier.price) / tier.originalPrice) * 100)}% OFF
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className='flex items-center gap-4 mb-4 pb-4 border-b'>
                    <div className='flex items-center gap-1'>
                      <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                      <span className='font-bold'>{tier.rating}</span>
                      <span className='text-gray-600 text-sm'>({tier.reviews})</span>
                    </div>
                    <span className='text-sm text-gray-600'>• {tier.time}</span>
                  </div>

                  <ul className='space-y-2 mb-6'>
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className='flex items-start gap-2 text-sm'>
                        <CheckCircle2 className='w-4 h-4 text-green-600 flex-shrink-0 mt-0.5' />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg py-2'>
                    <a
                      href={`${whatsappBase}?text=${encodeURIComponent(
                        `Hello ${business.name}, I want to book ${tier.name}.`
                      )}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      Book Now
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Trust Badges Section */}
      <section className='px-6 md:px-16 py-20 bg-blue-50'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>Why Book With Us</h2>
        <div className='grid md:grid-cols-4 gap-6'>
          {businessConfig.trustBadges.map((badge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className='bg-white p-6 rounded-2xl text-center shadow-md hover:shadow-lg transition'
            >
              <div className='text-4xl text-blue-600 mb-3 flex justify-center'>
                {badge.icon === 'Droplets' && <Droplets className='w-10 h-10' />}
                {badge.icon === 'Zap' && <Zap className='w-10 h-10' />}
                {badge.icon === 'CheckCircle2' && <CheckCircle2 className='w-10 h-10' />}
                {badge.icon === 'MapPin' && <MapPin className='w-10 h-10' />}
              </div>
              <h3 className='font-bold text-lg mb-2'>{badge.title}</h3>
              <p className='text-gray-600 text-sm'>{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className='px-6 md:px-16 py-20 grid md:grid-cols-2 gap-10 items-center bg-gray-50'>
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}>
          <img
            src={images.whyChoose}
            className='rounded-3xl shadow-2xl w-full h-[420px] object-cover'
          />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}>
          <h2 className='text-3xl md:text-5xl font-bold mb-8'>Why Choose Air Pro?</h2>
          <div className='space-y-4'>
            {features.map((b, i) => (
              <div key={i} className='flex items-center gap-3 text-lg'>
                <CheckCircle2 className='w-6 h-6 text-green-600 flex-shrink-0' />
                <span>{b}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Reviews Section */}
      <section className='px-6 md:px-16 py-20 bg-white'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-4'>Customer Stories from Lucknow</h2>
        <p className='text-center text-gray-600 mb-12'>Real experiences from AC service, repair and installation bookings.</p>
        <div className='grid md:grid-cols-3 gap-8'>
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className='bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-lg'
            >
              <div className='flex items-center gap-1 mb-3'>
                {[...Array(review.rating)].map((_, idx) => (
                  <Star key={idx} className='w-5 h-5 fill-yellow-400 text-yellow-400' />
                ))}
              </div>
              <p className='text-gray-700 mb-4 italic'>"{review.text}"</p>
              <div className='border-t pt-4'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='font-bold text-gray-900'>{review.name}</span>
                  {review.verified && (
                    <div className='flex items-center gap-1 text-green-600 text-sm'>
                      <CheckCircle2 className='w-4 h-4' />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <MapPin className='w-4 h-4' />
                  <span>{review.location}</span>
                  <span>•</span>
                  <span>{review.service}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Service Areas */}
      <section className='px-6 md:px-16 py-20 bg-gradient-to-r from-cyan-50 to-blue-50'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-4'>Service Areas in Lucknow</h2>
        <p className='text-center text-gray-600 mb-12'>We provide AC repair and maintenance services across Lucknow</p>
        <div className='grid md:grid-cols-3 gap-4'>
          {serviceAreas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className='bg-white p-4 rounded-lg border border-blue-200 flex items-center gap-2'
            >
              <MapPin className='w-5 h-5 text-blue-600 flex-shrink-0' />
              <span className='font-medium'>{area}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className='px-6 md:px-16 py-20 bg-white'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>Frequently Asked Questions</h2>
        <div className='max-w-3xl mx-auto space-y-4'>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className='bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition'
            >
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === i ? null : i)}
                className='w-full p-6 text-left font-semibold flex items-center justify-between hover:bg-gray-50 transition'
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition transform ${expandedFAQ === i ? 'rotate-180' : ''}`} />
              </button>
              {expandedFAQ === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className='px-6 pb-6 text-gray-700 border-t border-gray-200'
                >
                  {faq.a}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className='px-6 md:px-16 py-20 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-center'>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          <h2 className='text-3xl md:text-5xl font-bold mb-4'>Need AC Service Today?</h2>
          <p className='text-lg opacity-90 max-w-2xl mx-auto mb-8'>Call or WhatsApp now and get fast professional technician at your home. Same-day service available.</p>
          <div className='flex justify-center gap-4 flex-wrap'>
            <Button asChild className='rounded-full px-8 py-6 text-lg bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-bold'>
              <a href={`tel:+91${contact.phone}`}>
                <Phone className='mr-2 w-5 h-5' /> Call {contact.phone}
              </a>
            </Button>
            <Button asChild className='rounded-full px-8 py-6 text-lg bg-white text-blue-600 hover:bg-gray-100 font-bold'>
              <a href={`${whatsappBase}?text=${encodeURIComponent(contact.whatsappMessage)}`} target='_blank' rel='noreferrer'>
                <MessageCircle className='mr-2 w-5 h-5' /> WhatsApp Booking
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className='px-6 md:px-16 py-12 bg-gray-900 text-white grid md:grid-cols-3 gap-8'>
        <div>
          <h3 className='text-2xl font-bold mb-3'>{business.name}</h3>
          <p className='text-gray-400'>{business.descriptionLong}</p>
          <div className='flex gap-2 mt-4'>
            <Star className='w-5 h-5 fill-yellow-400 text-yellow-400' />
            <span className='text-yellow-400 font-bold'>{business.rating} Rating</span>
          </div>
        </div>
        <div>
          <h4 className='font-semibold mb-4 text-lg'>Contact</h4>
          <div className='space-y-3'>
            <p className='flex items-center gap-2'>
              <Phone className='w-4 h-4' /> <a href={`tel:+91${contact.phone}`} className='hover:text-blue-400'>{contact.phone}</a>
            </p>
            <p className='flex items-center gap-2'>
              <MessageCircle className='w-4 h-4' /> <a href={whatsappBase} target='_blank' rel='noreferrer' className='hover:text-green-400'>WhatsApp Available 24/7</a>
            </p>
            <p className='flex items-center gap-2'>
              <Clock className='w-4 h-4' /> Available Anytime
            </p>
          </div>
        </div>
        <div>
          <h4 className='font-semibold mb-4 text-lg'>Services</h4>
          <ul className='space-y-2 text-gray-400 text-sm'>
            {services.map((service, i) => (
              <li key={i}>• {service.title}</li>
            ))}
          </ul>
        </div>
      </footer>

      {/* Copyright */}
      <div className='px-6 md:px-16 py-4 bg-gray-950 text-center text-gray-500 text-sm'>
        <p>&copy; 2026 {business.name}. All rights reserved. | {business.location}</p>
      </div>
    </div>
  )
}

