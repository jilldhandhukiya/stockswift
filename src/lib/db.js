import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) {
    console.log('✅ Using cached MongoDB connection')
    return cached.conn
  }

  if (!cached.promise) {
    console.log('🔌 Connecting to MongoDB...')
    
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
      })
      .then((mongoose) => {
        console.log('✅ MongoDB connected successfully')
        console.log(`🌐 Host: ${mongoose.connection.host}`)
        return mongoose
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error:', error.message)
        cached.promise = null
        throw error
      })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error('❌ Failed to connect to MongoDB:', e.message)
    throw e
  }

  return cached.conn
}

// Handle connection events
if (typeof global !== 'undefined') {
  mongoose.connection.on('connected', () => {
    console.log('✅ Mongoose connected to MongoDB')
  })

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ Mongoose disconnected from MongoDB')
  })

  mongoose.connection.on('error', (err) => {
    console.error('❌ Mongoose connection error:', err.message)
  })
}

export default connectDB