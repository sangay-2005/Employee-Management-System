import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Trash2, Plus } from 'lucide-react'
import api from '@/api'
import { useToast } from './ui/use-toast'
import DepartmentCreateForm from './DepartmentCreateForm'

export default function DepartmentList() {
  const [departments, setDepartments] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      const res = await api.get('/departments')
      setDepartments(res.data)
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to load departments', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete department?')) return
    try {
      await api.delete(`/departments/${id}`)
      toast({ title: 'Success', description: 'Department deleted' })
      fetchDepartments()
    } catch (err) {
      toast({ title: 'Error', description: 'Delete failed', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Departments</h1>
        <Button onClick={() => setShowForm((v) => !v)}>
          <Plus className="mr-2 h-4 w-4" /> {showForm ? 'Close' : 'Add Department'}
        </Button>
      </div>

      {showForm && <DepartmentCreateForm onCreated={fetchDepartments} />}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.map((dep) => (
            <TableRow key={dep.id}>
              <TableCell>{dep.name}</TableCell>
              <TableCell>{dep.description || '—'}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(dep.id)}>
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
