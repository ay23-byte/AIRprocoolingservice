'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, MessageCircle, Facebook, Twitter, Linkedin } from 'lucide-react'
import { businessConfig } from '@/config/business'

export default function Footer() {
  return (
    <footer className='bg-gray-900 text-gray-100'>
      <div className='max-w-7xl mx-auto px-6 md:px-16 py-16'>
        <div className='grid md:grid-cols-4 gap-12 mb-12'>
          {/* Company Info */}
          <div>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold'>
                AC
              </div>
              <h3 className='font-bold text-lg'>{businessConfig.business.name}</h3>
            </div>
            <p className='text-gray-400 text-sm mb-4'>{businessConfig.business.descriptionLong}</p>
            <p className='text-gray-400 text-sm'>
              📍 {businessConfig.business.location}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='font-bold text-lg mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              <li><Link href='/' className='text-gray-400 hover:text-white transition'>Home</Link></li>
              <li><Link href='/about' className='text-gray-400 hover:text-white transition'>About Us</Link></li>
              <li><Link href='/services' className='text-gray-400 hover:text-white transition'>Services</Link></li>
              <li><Link href='/contact' className='text-gray-400 hover:text-white transition'>Contact</Link></li>
              <li><Link href='/privacy' className='text-gray-400 hover:text-white transition'>Privacy Policy</Link></li>
              <li><Link href='/terms' className='text-gray-400 hover:text-white transition'>Terms of Service</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className='font-bold text-lg mb-4'>Services</h4>
            <ul className='space-y-2'>
              <li className='text-gray-400 hover:text-white cursor-pointer transition'>AC Deep Cleaning</li>
              <li className='text-gray-400 hover:text-white cursor-pointer transition'>AC Repair</li>
              <li className='text-gray-400 hover:text-white cursor-pointer transition'>Gas Refill (₹{businessConfig.pricing.gasCharging.amount})</li>
              <li className='text-gray-400 hover:text-white cursor-pointer transition'>AC Installation</li>
              <li className='text-gray-400 hover:text-white cursor-pointer transition'>Maintenance Service</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className='font-bold text-lg mb-4'>Contact Us</h4>
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <Phone className='w-5 h-5 text-blue-400 flex-shrink-0' />
                <a href={`tel:+91${businessConfig.contact.phone}`} className='text-gray-400 hover:text-white'>
                  {businessConfig.contact.phone}
                </a>
              </div>
              <div className='flex items-center gap-3'>
                <MessageCircle className='w-5 h-5 text-green-400 flex-shrink-0' />
                <span className='text-gray-400'>WhatsApp: 24/7</span>
              </div>
              <div className='flex items-center gap-3'>
                <MapPin className='w-5 h-5 text-red-400 flex-shrink-0' />
                <span className='text-gray-400'>{businessConfig.business.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className='border-t border-gray-700 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='flex gap-4 mb-4 md:mb-0'>
              <a href='#' className='text-gray-400 hover:text-white transition'>
                <Facebook className='w-6 h-6' />
              </a>
              <a href='#' className='text-gray-400 hover:text-white transition'>
                <Twitter className='w-6 h-6' />
              </a>
              <a href='#' className='text-gray-400 hover:text-white transition'>
                <Linkedin className='w-6 h-6' />
              </a>
            </div>
            <p className='text-gray-400 text-sm text-center md:text-right'>
              © {new Date().getFullYear()} {businessConfig.business.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
