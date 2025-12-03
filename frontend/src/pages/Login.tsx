import React, { useState } from 'react'
import api from '../api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const form = new URLSearchParams()
      form.append('username', email)
      form.append('password', password)
      const res = await api.post('/auth/login', form, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      localStorage.setItem('token', res.data.access_token)
      location.href = '/'
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Login failed')
    }
  }

  return (
    <div className="grid place-items-center min-h-screen">
      <form onSubmit={submit} className="space-y-4 p-6 border rounded w-80 bg-white">
        <h1 className="text-2xl font-bold">Login</h1>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div>
          <label htmlFor="email" className="block text-sm mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="border p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm mb-1">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="border p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="w-full bg-black text-white p-2 rounded">Sign in</button>
      </form>
    </div>
  )
}
