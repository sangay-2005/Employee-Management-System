import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Layout from '@/components/Layout'
import Login from '@/components/Login'
import Register from '@/components/Register'
import EmployeeList from '@/components/EmployeeList'
import DepartmentList from '@/components/DepartmentList'

const Protected = (element: JSX.Element) => (localStorage.getItem('token') ? element : <Navigate to="/login" />)

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/',
    element: Protected(<Layout />),
    children: [
      { index: true, element: <Navigate to="/employees" /> },
      { path: 'employees', element: <EmployeeList /> },
      { path: 'departments', element: <DepartmentList /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
