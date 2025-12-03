import { useToastInternal } from './toast'

export function useToast() {
  const { push } = useToastInternal()
  return { toast: push }
}

export const toast = (args: { title?: string; description?: string; variant?: 'default' | 'destructive' }) => {
  // noop proxy when used outside provider in rare cases
  console.warn('toast called before provider mounted', args)
}
