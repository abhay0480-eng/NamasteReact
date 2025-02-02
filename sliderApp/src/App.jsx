import React, { useState } from 'react'

const images = [
  "https://plus.unsplash.com/premium_photo-1698405316329-fd9c43d7e11c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1696233005540-c768b75bae95?q=80&w=3169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1524639099061-f8beec2b7538?q=80&w=2496&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682685797769-481b48222adf?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
const App = () => {
  const [showIndexedImage, setShowIndexedImage] = useState(0)

  const handleSlide = (prop) => {
    if(prop==="prev"){
      setShowIndexedImage(pre => pre===0? images.length-1 : pre-1)
    }
    if(prop==="next"){
      setShowIndexedImage(pre => (pre+1) % images.length)
    }
  }
  return (
    <div className='w-3/5 mx-auto'>
      <div className='w-full h-96 border-[1px] border-black drop-shadow-xl'>
  
        <img src={images[showIndexedImage]} alt='' className='w-full h-full object-cover' />
      
      </div>
      <div className='flex justify-between items-center'>
        <button onClick={() => handleSlide("prev")}>Previous</button>
        <button onClick={() => handleSlide("next")}>Next</button>
      </div>
      <div>{showIndexedImage}</div>
    </div>
  )
}

export default App
