import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Pencil, Trash2, Plus } from 'lucide-react'
import api from '@/api'
import { useToast } from './ui/use-toast'
import EmployeeCreateForm from './EmployeeCreateForm'

export default function EmployeeList() {
  const [employees, setEmployees] = useState<any[]>([])
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchEmployees()
  }, [])

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees')
      setEmployees(res.data)
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to load employees', variant: 'destructive' })
    }
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete employee?')) return
    try {
      await api.delete(`/employees/${id}`)
      toast({ title: 'Success', description: 'Employee deleted' })
      fetchEmployees()
    } catch (err) {
      toast({ title: 'Error', description: 'Delete failed', variant: 'destructive' })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Button onClick={() => setShowForm((v) => !v)}>
          <Plus className="mr-2 h-4 w-4" /> {showForm ? 'Close' : 'Add Employee'}
        </Button>
      </div>

      {showForm && <EmployeeCreateForm onCreated={fetchEmployees} />}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Hire Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((emp) => (
            <TableRow key={emp.id}>
              <TableCell>{emp.full_name}</TableCell>
              <TableCell>{emp.email}</TableCell>
              <TableCell>{emp.position}</TableCell>
              <TableCell>{emp.department?.name || 'N/A'}</TableCell>
              <TableCell>{emp.hire_date}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(emp.id)}>
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
