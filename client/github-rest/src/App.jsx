import { useState } from 'react'

function App() {

  return (
    <div className="bg-[#1AACAC] min-h-screen">
      <div className='container mx-auto'>
        <h2 className="text-[#1F4172] font-bold text-5xl py-10 text-center">Github Information</h2>
        <form className="flex gap-2 justify-center" action="" >
          <input className='p-2 rounded focus:outline-none' type="text" name="" id="" placeholder='Enter username' />
          <input className='p-2 rounded focus:outline-none' type="text" name="" id="" placeholder='Enter Repository name' />
        </form>
        <div className="flex gap-2 justify-center py-4">
          <button className='bg-[#EEEEEE] text-[#1AACAC] p-3 rounded'>Commits</button>
          <button className='bg-[#EEEEEE] text-[#1AACAC] p-3 rounded'>Collaborators</button>
          <button className='bg-[#EEEEEE] text-[#1AACAC] p-3 rounded'>Contribution</button>
        </div>
      </div>
    </div>
  )
}

export default App
