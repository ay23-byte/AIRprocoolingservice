import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo (persists during server runtime)
let bookingsStorage: any[] = [
  {
    _id: '1',
    customerName: 'Rajesh Kumar',
    phone: '9876543210',
    address: 'Gomti Nagar, Lucknow',
    service: 'AC Repair',
    latitude: 26.8505,
    longitude: 80.9499,
    createdAt: new Date('2026-05-10T10:30:00Z'),
  },
  {
    _id: '2',
    customerName: 'Priya Singh',
    phone: '9876543211',
    address: 'Hazratganj, Lucknow',
    service: 'AC Maintenance',
    latitude: 26.8700,
    longitude: 80.9200,
    createdAt: new Date('2026-05-10T11:00:00Z'),
  },
  {
    _id: '3',
    customerName: 'Amit Sharma',
    phone: '9876543212',
    address: 'Aliganj,Lucknow',
    service: 'AC Installation',
    latitude: 26.8200,
    longitude: 80.9900,
    createdAt: new Date('2026-05-10T11:30:00Z'),
  },
];

// GET - Retrieve all bookings
export async function GET() {
  try {
    // Check if MongoDB is properly configured
    const mongodbUri = process.env.MONGODB_URI;
    const isMongoConfigured =
      mongodbUri &&
      (mongodbUri.startsWith('mongodb://') || mongodbUri.startsWith('mongodb+srv://')) &&
      !mongodbUri.includes('your_mongodb_connection_string') &&
      !mongodbUri.includes('your_mongodb_connection_string_here');

    if (isMongoConfigured) {
      try {
        const { connectDB } = await import('@/lib/db/mongoose');
        const BookingModel = await import('@/lib/db/models/Booking');
        await connectDB();
        const Booking = BookingModel.default || BookingModel;
        const bookings = await Booking.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json(bookings);
      } catch (mongoError) {
        console.error('MongoDB error, falling back to in-memory:', mongoError);
        // Fallback to in-memory storage
        return NextResponse.json(bookingsStorage);
      }
    }

    // Otherwise, return in-memory bookings (demo mode)
    return NextResponse.json(bookingsStorage);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    // Fallback to in-memory storage if MongoDB fails
    return NextResponse.json(bookingsStorage);
  }
}

// POST - Create a new booking
export async function POST(request: NextRequest) {
  try {
    // Validate request body
    const body = await request.json();

    // Validate required fields
    if (!body.customerName || !body.phone || !body.address || !body.service) {
      return NextResponse.json(
        { error: 'Missing required fields: customerName, phone, address, service' },
        { status: 400 }
      );
    }

    // Check if MongoDB is properly configured
    const mongodbUri = process.env.MONGODB_URI;
    const isMongoConfigured =
      mongodbUri &&
      (mongodbUri.startsWith('mongodb://') || mongodbUri.startsWith('mongodb+srv://')) &&
      !mongodbUri.includes('your_mongodb_connection_string') &&
      !mongodbUri.includes('your_mongodb_connection_string_here');

    if (isMongoConfigured) {
      try {
        const { connectDB } = await import('@/lib/db/mongoose');
        const BookingModel = await import('@/lib/db/models/Booking');
        await connectDB();

        const Booking = BookingModel.default || BookingModel;
        const newBooking = new Booking({
          customerName: body.customerName,
          phone: body.phone,
          address: body.address,
          service: body.service,
          latitude: body.latitude || 26.8467,
          longitude: body.longitude || 80.9462,
        });

        const savedBooking = await newBooking.save();
        return NextResponse.json(
          {
            _id: savedBooking._id.toString(),
            customerName: savedBooking.customerName,
            phone: savedBooking.phone,
            address: savedBooking.address,
            service: savedBooking.service,
            latitude: savedBooking.latitude,
            longitude: savedBooking.longitude,
            createdAt: savedBooking.createdAt,
          },
          { status: 201 }
        );
      } catch (mongoError) {
        console.error('MongoDB save error, using in-memory fallback:', mongoError);
        // Fallback to in-memory storage if MongoDB fails
        const newBooking = {
          _id: Date.now().toString(),
          ...body,
          createdAt: new Date(),
        };
        bookingsStorage.unshift(newBooking);
        return NextResponse.json(newBooking, { status: 201 });
      }
    }

    // Otherwise, save to in-memory storage (demo mode)
    const newBooking = {
      _id: Date.now().toString(),
      customerName: body.customerName,
      phone: body.phone,
      address: body.address,
      service: body.service,
      latitude: body.latitude || 26.8467,
      longitude: body.longitude || 80.9462,
      createdAt: new Date(),
    };

    bookingsStorage.unshift(newBooking); // Add to beginning

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create booking';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}


