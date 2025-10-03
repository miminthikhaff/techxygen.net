'use client'

import React from 'react'

type MaxWidth = '4xl' | '5xl' | '6xl' | '7xl'

interface PageContainerProps {
  children: React.ReactNode
  className?: string
  maxWidth?: MaxWidth
}

const maxWidthClass: Record<MaxWidth, string> = {
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
}

export function PageContainer({ children, className = '', maxWidth = '6xl' }: PageContainerProps) {
  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className={`${maxWidthClass[maxWidth]} mx-auto`}>
        {children}
      </div>
    </div>
  )
}


