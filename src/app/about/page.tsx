import { Star, Award, Users, Clock } from 'lucide-react'
import { businessConfig } from '@/config/business'

export const metadata = {
  title: 'About Us - Air Pro Cooling Service',
  description: 'Learn about Air Pro Cooling Service - Professional AC repair and installation in Lucknow',
}

export default function About() {
  return (
    <>
      <main className='min-h-screen bg-white'>
        {/* Hero Section */}
        <section className='bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16 px-6'>
          <div className='max-w-4xl mx-auto text-center'>
            <h1 className='text-4xl md:text-5xl font-bold mb-4'>About Air Pro Cooling Service</h1>
            <p className='text-xl opacity-90'>
              Your trusted partner for AC repair, installation, and maintenance in Lucknow since {businessConfig.business.experience}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className='max-w-4xl mx-auto px-6 md:px-16 py-16'>
          {/* Stats Section */}
          <div className='grid md:grid-cols-4 gap-6 mb-16'>
            <div className='text-center p-6 bg-gray-50 rounded-lg'>
              <div className='text-4xl font-bold text-blue-600 mb-2'>{businessConfig.business.rating}</div>
              <div className='flex justify-center mb-1'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                ))}
              </div>
              <p className='text-gray-600 text-sm'>Rating on Services</p>
            </div>
            <div className='text-center p-6 bg-gray-50 rounded-lg'>
              <div className='text-4xl font-bold text-blue-600 mb-2'>{businessConfig.business.reviews}+</div>
              <p className='text-gray-600 text-sm'>Customer Reviews</p>
            </div>
            <div className='text-center p-6 bg-gray-50 rounded-lg'>
              <div className='text-4xl font-bold text-blue-600 mb-2'>{businessConfig.business.customers}</div>
              <p className='text-gray-600 text-sm'>Happy Customers</p>
            </div>
            <div className='text-center p-6 bg-gray-50 rounded-lg'>
              <div className='text-4xl font-bold text-blue-600 mb-2'>{businessConfig.business.experience}</div>
              <p className='text-gray-600 text-sm'>Years Experience</p>
            </div>
          </div>

          {/* About Content */}
          <div className='space-y-8 mb-16'>
            <section>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>Our Story</h2>
              <p className='text-gray-700 mb-4'>
                Air Pro Cooling Service started with a simple mission: to provide reliable, professional AC repair and installation services at affordable prices in Lucknow. Over the years, we've grown to become one of the most trusted names in the AC servicing industry.
              </p>
              <p className='text-gray-700'>
                With a team of skilled and certified technicians, we've successfully served over {businessConfig.business.customers} customers, earning a consistent 4.9-star rating across all our services. Our commitment to excellence and customer satisfaction drives everything we do.
              </p>
            </section>

            <section>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>Why Choose Us?</h2>
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='flex gap-4'>
                  <Award className='w-8 h-8 text-blue-600 flex-shrink-0' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-2'>Certified Technicians</h3>
                    <p className='text-gray-700 text-sm'>Our technicians are highly trained and certified with years of industry experience.</p>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <Clock className='w-8 h-8 text-blue-600 flex-shrink-0' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-2'>Same-Day Service</h3>
                    <p className='text-gray-700 text-sm'>Emergency repairs available 24/7 with quick response times.</p>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <Star className='w-8 h-8 text-blue-600 flex-shrink-0' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-2'>Quality Guarantee</h3>
                    <p className='text-gray-700 text-sm'>All services come with warranty and quality guarantee.</p>
                  </div>
                </div>
                <div className='flex gap-4'>
                  <Users className='w-8 h-8 text-blue-600 flex-shrink-0' />
                  <div>
                    <h3 className='font-bold text-gray-900 mb-2'>Customer First</h3>
                    <p className='text-gray-700 text-sm'>We prioritize customer satisfaction in every service we provide.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>Our Services</h2>
              <p className='text-gray-700 mb-4'>
                We offer comprehensive AC solutions for all your needs:
              </p>
              <ul className='space-y-2 text-gray-700'>
                <li>✓ AC Deep Cleaning & Servicing</li>
                <li>✓ AC Repair & Troubleshooting</li>
                <li>✓ Gas Refill & Leak Detection</li>
                <li>✓ AC Installation & Uninstallation</li>
                <li>✓ Annual Maintenance Contracts</li>
                <li>✓ Emergency AC Repair Service</li>
              </ul>
            </section>

            <section>
              <h2 className='text-3xl font-bold text-gray-900 mb-4'>Service Coverage</h2>
              <p className='text-gray-700 mb-4'>
                We serve the entire Lucknow region including:
              </p>
              <div className='grid md:grid-cols-2 gap-4 text-gray-700'>
                <div>
                  <p>• Gomti Nagar</p>
                  <p>• Hazratganj</p>
                  <p>• Aliganj</p>
                  <p>• Jankipuram</p>
                  <p>• Indiranagar</p>
                </div>
                <div>
                  <p>• Alambagh</p>
                  <p>• Rajajipuram</p>
                  <p>• Avadh</p>
                  <p>• Charbagh</p>
                  <p>• And more...</p>
                </div>
              </div>
            </section>
          </div>

          {/* CTA */}
          <div className='bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-8 rounded-lg text-center'>
            <h2 className='text-2xl font-bold mb-4'>Ready to Experience Our Service?</h2>
            <p className='mb-6'>Contact us today for professional AC repair, maintenance, or installation.</p>
            <div className='flex gap-4 justify-center flex-wrap'>
              <a href={`tel:+91${businessConfig.contact.phone}`} className='px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100'>
                Call Now
              </a>
              <a href={`https://wa.me/91${businessConfig.contact.phone}?text=${encodeURIComponent(businessConfig.contact.whatsappMessage)}`} target='_blank' rel='noreferrer' className='px-6 py-3 bg-green-500 hover:bg-green-600 font-bold rounded-lg'>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
