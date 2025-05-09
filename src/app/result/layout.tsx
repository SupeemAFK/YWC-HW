import React from 'react'
import Fade from '@/app/components/Animated/Fade'

function ResultLayout({ children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <Fade animKey='result'>
        <div className='h-screen flex justify-center items-center font-prompt'>
            {children}
        </div>
    </Fade>
  )
}

export default ResultLayout