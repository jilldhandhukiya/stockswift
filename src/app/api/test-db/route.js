import { connectDB } from '../../../lib/db.js'

export async function GET(request) {
  try {
    console.log('🧪 Testing MongoDB connection...')
    const connection = await connectDB()
    
    const dbName = connection.connection.name || 'stockmaster'
    const host = connection.connection.host || 'localhost'
    const port = connection.connection.port || 27017
    const readyState = connection.connection.readyState
    const readyStateDesc = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'][readyState]
    
    console.log('✅ Connection Details:')
    console.log(`   Database: ${dbName}`)
    console.log(`   Host: ${host}`)
    console.log(`   Port: ${port}`)
    console.log(`   Status: ${readyStateDesc}`)
    
    return Response.json({
      success: true,
      message: '✅ MongoDB connection successful',
      database: dbName,
      host: host,
      port: port,
      readyState: readyState,
      readyStateDesc: readyStateDesc
    }, { status: 200 })
  } catch (error) {
    console.error('❌ Test failed:', error.message)
    return Response.json({
      success: false,
      message: '❌ MongoDB connection failed',
      error: error.message
    }, { status: 500 })
  }
}