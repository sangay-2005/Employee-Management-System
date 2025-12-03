import { Link, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="p-4 bg-white shadow flex gap-4">
        <Link to="/employees">Employees</Link>
        <Link to="/departments">Departments</Link>
        <button className="ml-auto" onClick={() => { localStorage.removeItem('token'); location.href = '/login' }}>Logout</button>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
