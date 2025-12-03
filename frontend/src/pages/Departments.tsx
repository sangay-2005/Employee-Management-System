import { useEffect, useState } from 'react'
import api from '../api'

export default function Departments() {
  const [departments, setDepartments] = useState<any[]>([])

  const load = async () => {
    const res = await api.get('/departments')
    setDepartments(res.data)
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <h1 className="text-2xl mb-4">Departments</h1>
      <ul className="list-disc ml-6">
        {departments.map((d) => (
          <li key={d.id}>{d.name}</li>
        ))}
      </ul>
    </div>
  )
}
