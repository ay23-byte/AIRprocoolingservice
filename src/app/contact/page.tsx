'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'
import { businessConfig } from '@/config/business'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, send to backend/email service
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <>
      <main className='min-h-screen bg-white'>
        {/* Hero */}
        <section className='bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16 px-6'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4'>Contact Us</h1>
            <p className='text-xl opacity-90'>
              Get in touch with our team for any queries or service bookings
            </p>
          </div>
        </section>

        <div className='max-w-6xl mx-auto px-6 md:px-16 py-16'>
          <div className='grid md:grid-cols-2 gap-12'>
            {/* Contact Information */}
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-8'>Get In Touch</h2>
              
              <div className='space-y-6'>
                {/* Phone */}
                <div className='flex gap-4'>
                  <div className='flex-shrink-0'>
                    <Phone className='w-6 h-6 text-blue-600 mt-1' />
                  </div>
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>Call Us</h3>
                    <a href={`tel:+91${businessConfig.contact.phone}`} className='text-blue-600 font-semibold text-lg hover:underline'>
                      +91 {businessConfig.contact.phone}
                    </a>
                    <p className='text-gray-600 text-sm'>Available 24/7</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className='flex gap-4'>
                  <div className='flex-shrink-0'>
                    <MessageCircle className='w-6 h-6 text-green-600 mt-1' />
                  </div>
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>WhatsApp</h3>
                    <a href={`https://wa.me/91${businessConfig.contact.phone}?text=${encodeURIComponent(businessConfig.contact.whatsappMessage)}`} target='_blank' rel='noreferrer' className='text-green-600 font-semibold hover:underline'>
                      Message us on WhatsApp
                    </a>
                    <p className='text-gray-600 text-sm'>Fast response guaranteed</p>
                  </div>
                </div>

                {/* Email */}
                <div className='flex gap-4'>
                  <div className='flex-shrink-0'>
                    <Mail className='w-6 h-6 text-red-600 mt-1' />
                  </div>
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>Email</h3>
                    <a href='mailto:info@airprocooling.com' className='text-red-600 font-semibold hover:underline'>
                      info@airprocooling.com
                    </a>
                    <p className='text-gray-600 text-sm'>Response within 24 hours</p>
                    <a href='mailto:yk945867@gmail.com' className='text-red-600 font-semibold hover:underline block mt-2'>
                      yk945867@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className='flex gap-4'>
                  <div className='flex-shrink-0'>
                    <MapPin className='w-6 h-6 text-purple-600 mt-1' />
                  </div>
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>Location</h3>
                    <p className='text-gray-700 font-semibold'>{businessConfig.business.location}</p>
                    <p className='text-gray-600 text-sm'>Serving entire Lucknow region</p>
                  </div>
                </div>

                {/* Hours */}
                <div className='flex gap-4'>
                  <div className='flex-shrink-0'>
                    <Clock className='w-6 h-6 text-orange-600 mt-1' />
                  </div>
                  <div>
                    <h3 className='font-bold text-gray-900 mb-1'>Working Hours</h3>
                    <p className='text-gray-700 font-semibold'>24/7 Service Available</p>
                    <p className='text-gray-600 text-sm'>Emergency services available anytime</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className='mt-8 bg-gray-200 rounded-lg h-64 flex items-center justify-center'>
                <p className='text-gray-600 text-center'>
                  📍 Visit us in Lucknow<br/>
                  <span className='text-sm'>Interactive map coming soon</span>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-8'>Send us a Message</h2>
              
              {submitted && (
                <div className='mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg'>
                  ✓ Thank you! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Full Name</label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                    placeholder='Your name'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Email Address</label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                    placeholder='your@email.com'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Phone Number</label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                    placeholder='10 digit phone number'
                  />
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Subject</label>
                  <select
                    name='subject'
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                  >
                    <option>Select a subject</option>
                    <option>AC Repair</option>
                    <option>AC Gas Refill</option>
                    <option>AC Installation</option>
                    <option>AC Maintenance</option>
                    <option>General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className='block text-gray-700 font-semibold mb-2'>Message</label>
                  <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                    placeholder='Tell us about your AC issue or inquiry...'
                  ></textarea>
                </div>

                <button
                  type='submit'
                  className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition'
                >
                  Send Message
                </button>
              </form>

              <p className='text-gray-600 text-sm mt-4 text-center'>
                Or call us directly at <a href={`tel:+91${businessConfig.contact.phone}`} className='text-blue-600 font-semibold'>{businessConfig.contact.phone}</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
