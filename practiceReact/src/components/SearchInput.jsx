import React, { useContext, useEffect, useMemo, useState } from 'react'
import { TodoContext } from '../context/TodoContext';

const SearchInput = () => {
    const { todoData } = useContext(TodoContext);
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [activeIndex, setActiveIndex] = useState(-1)

    const debounce = (fnc, delay) => {
        let timeout;
        return (...props) => {
          clearTimeout(timeout)
          timeout = setTimeout(() => {
            fnc(...props)
          }, delay);
        }
      }
    
      const searchFnc = (query) => {
        const filteredTodo = todoData.filter((item) => item.todo.toLowerCase().includes(query?.toLowerCase()))
        setSearchResult(filteredTodo || [])
      }
    
      const debounceSearch = useMemo(() => {
       return debounce(searchFnc,1000)
      },[todoData]) 
    
      useEffect(() => {
        debounceSearch(searchQuery)
      },[searchQuery,debounceSearch])

    const handleKeyDown = (e) => {
        if(e.key === "ArrowDown"){
          setActiveIndex(pre => Math.min(pre+1, searchResult.length-1) )
        }else if(e.key === "ArrowUp"){
          setActiveIndex(pre => Math.max(pre-1, -1) )
        }else if(e.key === "Enter"){
          setSearchQuery(searchResult[activeIndex].todo)
          setActiveIndex(-1)
          setSearchResult([])
        }
      }
  return (
    <div className='flex justify-center items-center p-5'>
        <div className='w-96 relative'>
          <input 
          type='search'  
          value={searchQuery}
          placeholder='Search Todo...' 
          className='px-2 py-2'
          onChange={(e) => setSearchQuery(e.target.value)} 
          onKeyDown={handleKeyDown}
          /> 
          {(searchQuery && searchResult.length>0) && <div className='absolute top-10 overflow-y-scroll max-h-96 bg-white p-3 min-w-96 z-20 shadow-lg rounded-md '>
                {searchResult.map((item,index) => {
                  return(
                    <div key={item.id}   className={`${index===activeIndex ? "bg-black text-white" :""}`}>
                      {item.todo}
                    </div>
                  )
                })}
          </div>}
        </div>
      </div>
  )
}

export default SearchInput
