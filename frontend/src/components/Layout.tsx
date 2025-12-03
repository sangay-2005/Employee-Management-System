import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { Users, Building2, LogOut, Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export default function Layout() {
  const [darkMode, setDarkMode] = useState(false)
  const location = useLocation()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r dark:bg-neutral-900 dark:text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">EmployeeMS</h1>
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/employees" className={cn('flex items-center gap-2 p-2 rounded', location.pathname === '/employees' ? 'bg-black text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800')}>
            <Users className="h-5 w-5" />
            Employees
          </Link>
          <Link to="/departments" className={cn('flex items-center gap-2 p-2 rounded', location.pathname === '/departments' ? 'bg-black text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800')}>
            <Building2 className="h-5 w-5" />
            Departments
          </Link>
        </nav>
        <div className="absolute bottom-0 w-full p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start" onClick={toggleDarkMode}>
            {darkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
            Toggle Theme
          </Button>
          <Button variant="ghost" className="w-full justify-start text-red-600" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  )
}
