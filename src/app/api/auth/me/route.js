import { NextResponse } from 'next/server'
import { authenticateRequest } from '@/lib/auth'
import { connectDB } from '@/lib/db'
import User from '@/models/User'

export async function GET(request) {
  const auth = authenticateRequest(request)
  if (!auth.ok) {
    return NextResponse.json({ message: auth.error || 'Unauthorized' }, { status: auth.status || 401 })
  }
  try {
    await connectDB()
    const user = await User.findById(auth.payload.userId).select('_id name email role createdAt updatedAt')
    if (!user) return NextResponse.json({ message: 'User not found' }, { status: 404 })
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  } catch (e) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
