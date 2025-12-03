import * as React from 'react'

export function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full border-collapse">{children}</table>
}
export function TableHeader({ children }: { children: React.ReactNode }) {
  return <thead className="bg-neutral-100">{children}</thead>
}
export function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>
}
export function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className="border-b">{children}</tr>
}
export function TableHead({ children, className }: { children: React.ReactNode; className?: string }) {
  return <th className={"text-left p-2 " + (className || '')}>{children}</th>
}
export function TableCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={"p-2 " + (className || '')}>{children}</td>
}
