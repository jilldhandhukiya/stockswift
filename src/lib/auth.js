import jwt from 'jsonwebtoken'

export const TOKEN_COOKIE = 'token'

export function signToken(payload, options = {}) {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET is not set')
  return jwt.sign(payload, secret, { expiresIn: '7d', ...options })
}

export function verifyToken(token) {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('JWT_SECRET is not set')
  return jwt.verify(token, secret)
}

export function getTokenFromRequest(request) {
  const auth = request.headers.get('authorization') || request.headers.get('Authorization')
  if (auth && auth.startsWith('Bearer ')) {
    return auth.slice(7)
  }
  const cookieHeader = request.headers.get('cookie') || request.headers.get('Cookie')
  if (cookieHeader) {
    const parts = cookieHeader.split(';').map((c) => c.trim())
    for (const p of parts) {
      if (p.startsWith(`${TOKEN_COOKIE}=`)) return decodeURIComponent(p.split('=')[1] || '')
    }
  }
  return null
}

export function setAuthCookie(response, token, maxAgeSeconds = 60 * 60 * 24 * 7) {
  // NextResponse instance expected
  response.cookies.set({
    name: TOKEN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: maxAgeSeconds,
  })
  return response
}

export function clearAuthCookie(response) {
  response.cookies.set({
    name: TOKEN_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    expires: new Date(0),
  })
  return response
}

export function authenticateRequest(request) {
  try {
    const token = getTokenFromRequest(request)
    if (!token) return { ok: false, status: 401, error: 'Missing token' }
    const payload = verifyToken(token)
    return { ok: true, payload }
  } catch (e) {
    return { ok: false, status: 401, error: 'Invalid token' }
  }
}
