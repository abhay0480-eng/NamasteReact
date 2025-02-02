import React, { useCallback, useEffect, useMemo, useState } from 'react'
import withLoading from './hocs/withLoading'

const App = ({todoList,setTodoList}) => {
  const [searchQuery,setSearchQuery] = useState("")
  const [searchResults,setSearchResults] = useState([])
  const [activeIndex,setActiveIndex] = useState(-1)

  const completed = useMemo(() => 
    todoList.filter(item => item.completed),
    [todoList]
  )

  const unCompleted = useMemo(() => 
    todoList.filter(item => !item.completed),
    [todoList]
  )
   
   const handleChange = useCallback((id) => {
    setTodoList(pre => pre.map((item) => item.id === id ? {...item, completed: !item.completed} : item))
   }, [setTodoList])


   const debounce = (fnc, delay) => {
      let timeout;
      return (...props) => {
          clearTimeout(timeout)
        timeout = setTimeout(() => {
          fnc(...props)
        },delay)
      }
   }

   const filteredData = (query) => {
    const filteredTodo = todoList.filter((item) => item.todo.toLowerCase().includes(query.toLowerCase()))
    setSearchResults(filteredTodo || [])
   }

   const debounceSearch = useMemo(() => {
     debounce(filteredData, 1000)
   }, [todoList]) 

   useEffect(() => {
    debounceSearch(searchQuery)
   }, [searchQuery, debounceSearch])

   const handleKeyDown = (e) => {
    if(e.key === "ArrowDown"){
        setActiveIndex(pre => Math.min(pre+1, searchResults.length -1))
    }else if(e.key === "ArrowUp"){
      setActiveIndex(pre => Math.max(pre-1, -1))
    }else if(e.key === "Enter"){
      setSearchQuery(searchResults[activeIndex].todo)
      setSearchResults([])
      setActiveIndex(-1)
    }
   }

   
  return (
    <div>
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
        {(searchQuery && searchResults.length>0) && <div className='absolute top-10 overflow-y-scroll max-h-96 bg-white p-3 min-w-96 z-20 shadow-lg rounded-md '>
              {searchResults.map((item,index) => {
                return(
                  <div key={item.id}   className={`${index===activeIndex ? "bg-black text-white" :""}`}>
                    {item.todo}
                  </div>
                )
              })}
        </div>}
      </div>
    </div>
      <div className='grid grid-cols-2 gap-x-10 my-10 px-10'>
        <div className=''>
            {unCompleted.map((item,index) => {
              return(
                <div key={item.id} className='flex justify-start items-center gap-5'>
                  <div>
                    <input
                      type='checkbox'
                      checked={item.completed}
                      onChange={() => handleChange(item.id)}
                    />
                  </div>
                  <div>
                    {item.todo}
                  </div>
                </div>
              )
            })}
        </div>

        <div className=''>
            {completed.map((item,index) => {
              return(
                <div key={item.id} className='flex justify-start items-center gap-5'>
                  <div>
                    <input type='checkbox' checked={item.completed} className='' onChange={() => handleChange(item.id)} />
                  </div>
                  <div>
                    {item.todo}
                  </div>
                </div>
              )
            })}
        </div>

      </div>
    </div>
  )
}

export default withLoading(App) 
