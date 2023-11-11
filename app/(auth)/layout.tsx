import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div>
      <h1>Auth Header</h1>
      {children}
    </div>
  )
}