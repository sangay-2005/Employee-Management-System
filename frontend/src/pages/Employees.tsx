import { useEffect, useState } from 'react'
import api from '../api'

export default function Employees() {
  const [employees, setEmployees] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setError(null)
    try {
      const res = await api.get('/employees')
      setEmployees(res.data)
    } catch (e: any) {
      setError('Failed to load employees')
    }
  }

  useEffect(() => { load() }, [])

  const remove = async (id: number) => {
    if (!confirm('Delete employee?')) return
    try {
      await api.delete(`/employees/${id}`)
      await load()
      alert('Employee deleted')
    } catch {
      alert('Delete failed')
    }
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Employees</h1>
      {error && <div className="text-red-600">{error}</div>}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Position</th>
            <th className="p-2 border">Department</th>
            <th className="p-2 border">Hire Date</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="p-2 border">{emp.full_name}</td>
              <td className="p-2 border">{emp.email}</td>
              <td className="p-2 border">{emp.position}</td>
              <td className="p-2 border">{emp.department?.name || '—'}</td>
              <td className="p-2 border">{new Date(emp.hire_date).toLocaleDateString()}</td>
              <td className="p-2 border">
                <button className="text-red-600" onClick={() => remove(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
