import React from 'react';
import React, { useEffect, useState } from 'react'


const itemsPerPage = 2;
const App = () => {
  const [page, setpage] = useState(1)
  const [displayData, setDisplayData] = useState([])
  const data = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
  ];

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    setDisplayData(data.slice(startIndex,endIndex))
  },[page])

  const pageButtons = []

  const pages = Math.ceil(data.length / itemsPerPage)

  for (let index = 0; index < pages; index++) {
    pageButtons.push(index)
  }

  const handlePrev = () => {
      if(page > 1){
        setpage(pre=>pre-1)
      }
  }

  const handleNext = () => {
    if(page<pages ){
      setpage(pre=>pre+1)

    }
  }



  return (
    <div>
      {displayData.map((item) => (
        <div>{item}</div>
      ))}
      <div className='flex gap-5'>
        <button onClick={() => handlePrev()}>prev</button>
        {pageButtons.map((item) => (
          <div onClick={() => setpage(item+1)}> 
            {item+1}
          </div>
        ))}
        <button onClick={() => handleNext()}>next</button>
      </div>
    </div>
  )
}

export default App