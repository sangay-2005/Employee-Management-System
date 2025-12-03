import { useEffect, useState } from 'react'
import api from '../api'

export default function EmployeeCreateForm({ onCreated }: { onCreated: () => void }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [position, setPosition] = useState('')
  const [hireDate, setHireDate] = useState('')
  const [departmentId, setDepartmentId] = useState<number | ''>('')
  const [departments, setDepartments] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/departments')
        setDepartments(res.data)
      } catch (e) {
        console.error('Failed to load departments', e)
      }
    })()
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/employees', {
        full_name: fullName,
        email,
        position: position || undefined,
        hire_date: hireDate,
        department_id: departmentId === '' ? undefined : departmentId,
      })
      setFullName('')
      setEmail('')
      setPosition('')
      setHireDate('')
      setDepartmentId('')
      onCreated()
      alert('Employee created')
    } catch (e) {
      alert('Failed to create employee (check required fields and date format YYYY-MM-DD)')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-2 border p-4 rounded bg-white">
      <div>
        <label htmlFor="emp-full-name" className="block text-sm mb-1">Full Name</label>
        <input
          id="emp-full-name"
          name="full_name"
          className="border p-2 w-full"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="emp-email" className="block text-sm mb-1">Email</label>
        <input
          id="emp-email"
          name="email"
          type="email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="emp-position" className="block text-sm mb-1">Position</label>
        <input
          id="emp-position"
          name="position"
          className="border p-2 w-full"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="emp-hire-date" className="block text-sm mb-1">Hire Date</label>
        <input
          id="emp-hire-date"
          name="hire_date"
          type="date"
          className="border p-2 w-full"
          value={hireDate}
          onChange={(e) => setHireDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="emp-department-id" className="block text-sm mb-1">Department</label>
        <select
          id="emp-department-id"
          name="department_id"
          className="border p-2 w-full"
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value === '' ? '' : Number(e.target.value))}
        >
          <option value="">(none)</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>
      <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">{loading ? 'Saving...' : 'Create Employee'}</button>
    </form>
  )
}
