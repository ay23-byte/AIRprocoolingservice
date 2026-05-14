'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { businessConfig } from '@/config/business'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const whatsappBase = `https://wa.me/91${businessConfig.contact.phone}`

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy' },
  ]

  return (
    <header className='sticky top-0 z-50 bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20'>
          {/* Logo/Brand */}
          <Link href='/' className='flex items-center gap-2'>
            <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold'>
              AC
            </div>
            <div className='hidden sm:block'>
              <h1 className='font-bold text-lg text-gray-900'>{businessConfig.business.name}</h1>
              <p className='text-xs text-gray-600'>Lucknow</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center gap-8'>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className='text-gray-700 hover:text-blue-600 font-medium transition'
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Call to Action Buttons */}
          <div className='hidden md:flex items-center gap-3'>
            <a
              href={`tel:+91${businessConfig.contact.phone}`}
              className='flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium'
            >
              <Phone className='w-4 h-4' />
              Call
            </a>
            <a
              href={`${whatsappBase}?text=${encodeURIComponent(businessConfig.contact.whatsappMessage)}`}
              target='_blank'
              rel='noreferrer'
              className='flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium'
            >
              <MessageCircle className='w-4 h-4' />
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden p-2 hover:bg-gray-100 rounded-lg'
          >
            {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className='md:hidden pb-4 space-y-2'>
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className='block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg'
              >
                {link.label}
              </Link>
            ))}
            <div className='pt-4 flex gap-2'>
              <a
                href={`tel:+91${businessConfig.contact.phone}`}
                className='flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium'
              >
                <Phone className='w-4 h-4' />
                Call
              </a>
              <a
                href={`${whatsappBase}?text=${encodeURIComponent(businessConfig.contact.whatsappMessage)}`}
                target='_blank'
                rel='noreferrer'
                className='flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg font-medium'
              >
                <MessageCircle className='w-4 h-4' />
                Chat
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
