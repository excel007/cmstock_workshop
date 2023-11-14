import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className='bg-gradient-to-r from-cyan-500 to-blue-500	h-screen'>
      {children}
    </div>
  )
}