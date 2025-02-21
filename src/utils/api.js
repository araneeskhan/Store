const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/products`)
  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json()
}

export async function login(credentials) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  if (!response.ok) throw new Error('Login failed')
  return response.json()
} 