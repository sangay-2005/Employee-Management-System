import { useToastInternal } from './toast'

export function Toaster() {
  const { toasts, remove } = useToastInternal()
  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {toasts.map((t) => (
        <div key={t.id} className={`p-3 rounded shadow ${t.variant === 'destructive' ? 'bg-red-600 text-white' : 'bg-black text-white'}`}>
          {t.title && <div className="font-semibold">{t.title}</div>}
          {t.description && <div className="text-sm">{t.description}</div>}
          <button className="text-xs underline mt-1" onClick={() => remove(t.id)}>Dismiss</button>
        </div>
      ))}
    </div>
  )
}
