import React from 'react'

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-full pb-10 '> 
    <div className=' animate-spin border-4  border-t-transparent w-10 h-10 scale-150 rounded-full border-blue-800  '></div>
    </div>
  )
}

export default Loading