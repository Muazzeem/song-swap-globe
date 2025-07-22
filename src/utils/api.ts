
// Utility for making authenticated API requests
const API_BASE_URL = 'http://localhost:8000' // Replace with your actual API URL

export const makeAuthenticatedRequest = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem('access_token')
  
  if (!token) {
    throw new Error('No access token found')
  }

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

  if (response.status === 401) {
    // Token might be expired, redirect to login
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user_data')
    window.location.reload()
    return
  }

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`)
  }

  return response.json()
}

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token')
  
  if (!refreshToken) {
    throw new Error('No refresh token found')
  }

  const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh: refreshToken,
    }),
  })

  if (!response.ok) {
    throw new Error('Token refresh failed')
  }

  const data = await response.json()
  localStorage.setItem('access_token', data.access)
  
  return data.access
}
