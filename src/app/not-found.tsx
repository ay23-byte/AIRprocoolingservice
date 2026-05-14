import Link from 'next/link'
import { HomeIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center px-6'>
      <div className='text-center text-white'>
        <h1 className='text-9xl font-bold mb-4'>404</h1>
        <h2 className='text-4xl font-bold mb-4'>Page Not Found</h2>
        <p className='text-xl opacity-90 mb-8 max-w-md'>
          The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link href='/' className='inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition'>
          <HomeIcon className='w-5 h-5' />
          Back to Home
        </Link>
      </div>
    </div>
  )
}
