import React from 'react'

interface IUnprotectedLayout{
    children : React.ReactNode
}

const UnprotectedLayout:React.FC<IUnprotectedLayout> = ({children}) => {
  return (
    <div className='h-screen w-screen flex items-center justify-center'>{children}</div>
  )
}

export default UnprotectedLayout