import { useState } from 'react'
import api from '../api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')

  const handleRegister = async () => {
    try {
      const res = await api.post('/auth/register', { email, password, full_name: fullName || 'User' })
      localStorage.setItem('token', res.data.access_token)
      window.location.href = '/employees'
    } catch (err) {
      alert('Register failed - check console')
      console.error(err)
    }
  }

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.access_token)
      window.location.href = '/employees'
    } catch (err) {
      alert('Login failed - check console')
      console.error(err)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-8 border rounded-lg bg-white dark:bg-gray-800 w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">EmployeeMS</h1>
        <input className="w-full p-2 border mb-2 rounded" placeholder="Full Name (for register)" value={fullName} onChange={e => setFullName(e.target.value)} />
        <input className="w-full p-2 border mb-2 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="w-full p-2 border mb-4 rounded" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleRegister} className="w-full bg-green-600 text-white p-2 rounded mb-2">Register (any email/pass)</button>
        <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-2 rounded">Login (any registered email/pass)</button>
      </div>
    </div>
  )
}
