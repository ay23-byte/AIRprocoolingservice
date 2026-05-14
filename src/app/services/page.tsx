import { Star, CheckCircle2, Clock, Zap } from 'lucide-react'
import { businessConfig } from '@/config/business'

export const metadata = {
  title: 'Our Services - Air Pro Cooling Service',
  description: 'AC repair, installation, gas refill, and maintenance services in Lucknow',
}

export default function Services() {
  const { services, contact } = businessConfig
  const whatsappBase = `https://wa.me/91${contact.phone}`

  return (
    <>
      <main className='min-h-screen bg-white'>
        {/* Hero */}
        <section className='bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16 px-6'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4'>Our Services</h1>
            <p className='text-xl opacity-90'>
              Complete AC solutions for your cooling needs - Professional, Reliable, Affordable
            </p>
          </div>
        </section>

        <div className='max-w-6xl mx-auto px-6 md:px-16 py-16'>
          {/* Services Overview */}
          <div className='grid md:grid-cols-3 gap-6 mb-16'>
            <div className='text-center p-6 bg-blue-50 rounded-lg'>
              <Zap className='w-12 h-12 text-blue-600 mx-auto mb-3' />
              <h3 className='text-xl font-bold text-gray-900 mb-2'>Same-Day Service</h3>
              <p className='text-gray-700 text-sm'>Emergency repairs and installations available 24/7</p>
            </div>
            <div className='text-center p-6 bg-green-50 rounded-lg'>
              <CheckCircle2 className='w-12 h-12 text-green-600 mx-auto mb-3' />
              <h3 className='text-xl font-bold text-gray-900 mb-2'>Quality Guarantee</h3>
              <p className='text-gray-700 text-sm'>All services backed by warranty and satisfaction guarantee</p>
            </div>
            <div className='text-center p-6 bg-yellow-50 rounded-lg'>
              <Clock className='w-12 h-12 text-yellow-600 mx-auto mb-3' />
              <h3 className='text-xl font-bold text-gray-900 mb-2'>Quick Response</h3>
              <p className='text-gray-700 text-sm'>Technicians reach within 30-60 minutes in service area</p>
            </div>
          </div>

          {/* Services Detail */}
          <div className='space-y-16'>
            {services.map((service, idx) => (
              <div key={idx} className='border-b pb-16 last:border-b-0'>
                <h2 className='text-3xl font-bold text-gray-900 mb-2'>{service.title}</h2>
                <p className='text-gray-600 mb-8 text-lg'>{service.description}</p>

                <div className='grid md:grid-cols-2 gap-6'>
                  {service.tiers.map((tier, tierIdx) => (
                    <div
                      key={tierIdx}
                      className='bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200 hover:shadow-lg transition'
                    >
                      <div className='flex items-start justify-between mb-4'>
                        <h3 className='text-xl font-bold text-gray-900'>{tier.name}</h3>
                        {(tier as any).badge && (
                          <span className='bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full'>
                            {(tier as any).badge}
                          </span>
                        )}
                      </div>

                      {/* Price */}
                      <div className='mb-4'>
                        <div className='flex items-baseline gap-2 mb-2'>
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

                      {/* Rating & Time */}
                      <div className='flex items-center gap-4 mb-4 pb-4 border-b border-blue-200'>
                        <div className='flex items-center gap-1'>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(tier.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className='ml-2 font-bold text-gray-900'>{tier.rating}</span>
                        </div>
                        <span className='text-sm text-gray-600'>({tier.reviews} reviews)</span>
                        <span className='text-sm text-gray-600'>• {tier.time}</span>
                      </div>

                      {/* Features */}
                      <ul className='space-y-2 mb-6'>
                        {tier.features.map((feature, fIdx) => (
                          <li key={fIdx} className='flex items-start gap-2 text-sm text-gray-700'>
                            <CheckCircle2 className='w-4 h-4 text-green-600 flex-shrink-0 mt-0.5' />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <a
                        href={`${whatsappBase}?text=${encodeURIComponent(
                          `Hello, I want to book ${tier.name}`
                        )}`}
                        target='_blank'
                        rel='noreferrer'
                        className='w-full block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition'
                      >
                        Book Now
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className='mt-20 bg-gray-50 p-8 rounded-lg'>
            <h2 className='text-3xl font-bold text-gray-900 mb-8'>Frequently Asked Questions</h2>
            <div className='space-y-6'>
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>🔧 How often should I get my AC serviced?</h3>
                <p className='text-gray-700'>
                  We recommend servicing your AC at least twice a year - before summer and after summer season. Regular maintenance improves efficiency and extends the lifespan of your unit.
                </p>
              </div>
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>⏰ How long does a service take?</h3>
                <p className='text-gray-700'>
                  Service duration varies by type - AC cleaning typically takes 45-60 minutes, gas refill takes 60-90 minutes, and installation can take 1-3 hours depending on the complexity.
                </p>
              </div>
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>💰 Do you offer warranties?</h3>
                <p className='text-gray-700'>
                  Yes! All services include workmanship warranty. Gas refill comes with a 3-month warranty against leakage. We stand behind our quality of work.
                </p>
              </div>
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>📞 Can I book outside service hours?</h3>
                <p className='text-gray-700'>
                  Absolutely! We offer 24/7 emergency service. You can book on WhatsApp or call us anytime, and we'll assign a technician based on availability.
                </p>
              </div>
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>🚗 Do I need to pay for service call?</h3>
                <p className='text-gray-700'>
                  There's a nominal inspection charge of ₹299, which is waived if you proceed with the service on the same day.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className='mt-20 text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-12 rounded-lg'>
            <h2 className='text-3xl font-bold mb-4'>Ready to Book Your Service?</h2>
            <p className='mb-6 text-lg opacity-90'>Contact us today and experience professional AC service</p>
            <div className='flex gap-4 justify-center flex-wrap'>
              <a href={`tel:+91${contact.phone}`} className='px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100'>
                📞 Call Now
              </a>
              <a href={`${whatsappBase}?text=${encodeURIComponent(contact.whatsappMessage)}`} target='_blank' rel='noreferrer' className='px-8 py-3 bg-green-500 hover:bg-green-600 font-bold rounded-lg'>
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
