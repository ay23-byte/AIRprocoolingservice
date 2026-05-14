'use client'

import { useState, useEffect } from 'react'
import AirProCoolingService from '@/components/AirProCoolingService'
import BookingForm from '@/components/BookingForm'
import dynamic from 'next/dynamic'

const LucknowMap = dynamic(
  () => import('../components/LucknowMap'),
  {
    ssr: false,
    loading: () => <p>Loading map...</p>,
  }
);

interface Booking {
  id: string;
  latitude: number;
  longitude: number;
  service: string;
  customerName: string;
  address: string;
  phone?: string;
}

export default function Home() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch bookings from API
  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchBookings();
  }, []);

  // Refresh bookings when a new one is added
  const handleBookingAdded = () => {
    fetchBookings();
  };

  return (
    <>
      <AirProCoolingService />
      <div className='h-0.5'></div>
      <section className='w-full py-16 bg-gray-100'>
        <div className='max-w-6xl mx-auto px-6'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900'>Our Service Area & Live Bookings</h2>
          <p className='text-center text-gray-600 mb-8'>We serve the entire Lucknow region. Red dots show active service bookings. Book your service now!</p>
          
          {/* Booking Form */}
          <div className='bg-white p-6 rounded-lg shadow-md mb-8 flex justify-center'>
            <BookingForm onBookingAdded={handleBookingAdded} />
          </div>

          {/* Bookings Summary */}
          {!isLoading && bookings.length > 0 && (
            <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
              <h3 className='text-lg font-semibold mb-4 text-gray-800'>Active Bookings ({bookings.length})</h3>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto'>
                {bookings.map((booking) => (
                  <div key={booking.id} className='p-4 bg-red-50 border-l-4 border-red-500 rounded'>
                    <div className='flex items-center gap-2 mb-2'>
                      <div className='w-3 h-3 bg-red-500 rounded-full'></div>
                      <span className='font-semibold text-red-600'>{booking.service}</span>
                    </div>
                    <p className='text-sm text-gray-700'><strong>Customer:</strong> {booking.customerName}</p>
                    {booking.phone && <p className='text-sm text-gray-700'><strong>Phone:</strong> {booking.phone}</p>}
                    <p className='text-sm text-gray-600'>{booking.address}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isLoading && (
            <div className='text-center text-gray-600 mb-8'>Loading bookings...</div>
          )}

          <div className='rounded-lg overflow-hidden shadow-lg border-2 border-gray-300'>
            <LucknowMap bookings={bookings} />
          </div>
          
          <p className='text-center text-sm text-gray-600 mt-4'>
            <span className='inline-block w-3 h-3 bg-red-500 rounded-full mr-2'></span>
            Red dots = Customer bookings | Blue marker = Main office
          </p>
        </div>
      </section>
    </>
  );
}