
import React from 'react'
import Home from './components/Home'

const App = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-200 py-8 px-4'>
      <div className='text-center mb-8 '>
        <h1 className='text-5xl font-bold text-gray-800'>AI Image Enhancer</h1>
        <p></p>
      </div>
      <Home/>
      <div className='text-lg text-gray-500'>
        Upload image and get enhance version of it

      </div>
    </div>
  )
}

export default App