'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface BookingFormProps {
  onBookingAdded?: () => void;
}

export default function BookingForm({ onBookingAdded }: BookingFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    service: 'AC Repair',
    latitude: 26.8467,
    longitude: 80.9462,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setError(null); // Clear error when user starts typing
    setFormData(prev => ({
      ...prev,
      [name]: name === 'latitude' || name === 'longitude' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate form before submission
      if (!formData.customerName.trim()) {
        setError('Customer name is required');
        setIsLoading(false);
        return;
      }
      if (!formData.phone.trim()) {
        setError('Phone number is required');
        setIsLoading(false);
        return;
      }
      if (!formData.address.trim()) {
        setError('Address is required');
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form
        setFormData({
          customerName: '',
          phone: '',
          address: '',
          service: 'AC Repair',
          latitude: 26.8467,
          longitude: 80.9462,
        });
        setIsOpen(false);
        setError(null);
        
        // Notify parent component
        if (onBookingAdded) {
          onBookingAdded();
        }

        alert('✅ Booking confirmed successfully! We will contact you soon.');
      } else {
        // Handle non-200 responses
        setError(data.error || `Server error: ${response.status}. Please try again.`);
      }
    } catch (error) {
      console.error('Booking error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Network error. Please check your connection.';
      setError(`Failed to create booking: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className='bg-blue-600 hover:bg-blue-700 text-white'
      >
        {isOpen ? 'Cancel' : 'Book Now'}
      </Button>

      {isOpen && (
        <Card className='mt-4 border-2 border-blue-600'>
          <CardContent className='p-6'>
            <h3 className='text-xl font-bold mb-4'>Book Our Service</h3>
            
            {/* Error Message Display */}
            {error && (
              <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
                <p className='font-semibold'>Error:</p>
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>Customer Name *</label>
                <input
                  type='text'
                  name='customerName'
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100'
                  placeholder='Your name'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>Phone Number *</label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100'
                  placeholder='10-digit mobile number'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>Address *</label>
                <input
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100'
                  placeholder='Service location address'
                />
              </div>

              <div>
                <label className='block text-sm font-medium mb-1'>Service Type *</label>
                <select
                  name='service'
                  value={formData.service}
                  onChange={handleChange}
                  disabled={isLoading}
                  className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100'
                >
                  <option value='AC Repair'>AC Repair</option>
                  <option value='AC Maintenance'>AC Maintenance</option>
                  <option value='AC Installation'>AC Installation</option>
                  <option value='AC Cleaning'>AC Cleaning</option>
                  <option value='Gas Refill'>Gas Refill</option>
                </select>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-1'>Latitude</label>
                  <input
                    type='number'
                    name='latitude'
                    value={formData.latitude}
                    onChange={handleChange}
                    step='0.0001'
                    disabled={isLoading}
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-1'>Longitude</label>
                  <input
                    type='number'
                    name='longitude'
                    value={formData.longitude}
                    onChange={handleChange}
                    step='0.0001'
                    disabled={isLoading}
                    className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100'
                  />
                </div>
              </div>

              <Button
                type='submit'
                disabled={isLoading}
                className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold disabled:opacity-50'
              >
                {isLoading ? 'Booking...' : 'Confirm Booking'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
