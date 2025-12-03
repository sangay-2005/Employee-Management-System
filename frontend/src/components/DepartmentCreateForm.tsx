import { useState } from 'react'
import api from '../api'

export default function DepartmentCreateForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/departments', { name, description })
      setName('')
      setDescription('')
      onCreated()
      alert('Department created')
    } catch (e) {
      alert('Failed to create department')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-2 border p-4 rounded bg-white">
      <div>
        <label htmlFor="dept-name" className="block text-sm mb-1">Name</label>
        <input
          id="dept-name"
          name="name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="dept-description" className="block text-sm mb-1">Description</label>
        <input
          id="dept-description"
          name="description"
          className="border p-2 w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? 'Saving...' : 'Create Department'}</button>
    </form>
  )
}
