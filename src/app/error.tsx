'use client' 

import { useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, HomeIcon } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [isRetrying, setIsRetrying] = useState(false)

  const handleReset = () => {
    setIsRetrying(true)
    reset()
    setTimeout(() => setIsRetrying(false), 2000)
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center px-6'>
      <div className='text-center text-white'>
        <AlertTriangle className='w-20 h-20 mx-auto mb-4' />
        <h1 className='text-4xl font-bold mb-4'>Oops! Something Went Wrong</h1>
        <p className='text-xl opacity-90 mb-2 max-w-md'>
          We encountered an unexpected error. Please try again or contact us for support.
        </p>
        {process.env.NODE_ENV === 'development' && error.message && (
          <p className='text-sm opacity-75 my-4 font-mono bg-red-700 bg-opacity-50 p-3 rounded max-w-md'>
            Error: {error.message}
          </p>
        )}
        <div className='flex gap-4 justify-center mt-8 flex-wrap'>
          <button
            onClick={handleReset}
            disabled={isRetrying}
            className='inline-flex items-center gap-2 px-8 py-3 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition disabled:opacity-50'
          >
            <RefreshCw className={`w-5 h-5 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Retrying...' : 'Try Again'}
          </button>
          <Link href='/' className='inline-flex items-center gap-2 px-8 py-3 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition'>
            <HomeIcon className='w-5 h-5' />
            Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}
