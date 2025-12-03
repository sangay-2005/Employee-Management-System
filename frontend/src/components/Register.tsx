import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useToast } from './ui/use-toast'
import api from '@/api'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/register', { email, password, full_name: fullName })
      localStorage.setItem('token', res.data.access_token)
      toast({ title: 'Success', description: 'Registered successfully' })
      navigate('/employees')
    } catch (_) {
      toast({ title: 'Error', description: 'Registration failed', variant: 'destructive' })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 border rounded-lg bg-white">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" className="w-full">Register</Button>
        </form>
        <p className="text-center mt-4">Already have an account? <Link to="/login" className="text-blue-600">Login</Link></p>
      </div>
    </div>
  )
}
