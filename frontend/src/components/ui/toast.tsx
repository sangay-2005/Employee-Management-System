import * as React from 'react'

export type Toast = { id: number; title?: string; description?: string; variant?: 'default' | 'destructive' }

const ToastContext = React.createContext<{
  toasts: Toast[]
  push: (toast: Omit<Toast, 'id'>) => void
  remove: (id: number) => void
} | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])
  const push = (t: Omit<Toast, 'id'>) => setToasts((prev) => [...prev, { id: Date.now(), ...t }])
  const remove = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))
  return (
    <ToastContext.Provider value={{ toasts, push, remove }}>{children}</ToastContext.Provider>
  )
}

export function useToastInternal() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('ToastProvider missing')
  return ctx
}
