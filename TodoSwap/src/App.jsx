
import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [todoData, setTodoData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  const fetchtodo = async() => {
    try {
      const req = await fetch('https://dummyjson.com/todos');
      const res = await req.json()
      setTodoData(res.todos || [])

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchtodo()
  },[])



  const debounce = (fnc,delay) => {
      let timeout
      return (...args) => {
        if(timeout){
          clearTimeout(timeout)
        }
        timeout = setTimeout(() => {
          fnc(...args)
        },delay)
      }
  }

  const performSearch = (query) => {
    const results = todoData.filter((item) => item.todo.toLowerCase().includes(query.toLowerCase()))
    setSearchResults(results)
  }

  const debounceSearch = debounce(performSearch,1000)

  useEffect(() => {
    debounceSearch(searchQuery)
  },[searchQuery])


  
  console.log("todoData",todoData);

  const uncompletedTodo = todoData.filter((item,index) => !item.completed)
  const completedTodo = todoData.filter((item,index) => item.completed)

  const handleChange = (id) => {
      setTodoData(pre => pre.map((item)=> item.id===id ? {...item, completed: !item.completed} : item))
  }


  return (
    <>
    <div className='flex justify-center items-center p-5'>
      <div className='w-96 relative'>
        <input type='search'  placeholder='Search Todo...' onChange={(e) => setSearchQuery(e.target.value)} /> 
        {(searchQuery && searchResults.length>0) && <div className='absolute top-10 overflow-y-scroll max-h-96 bg-white p-3 min-w-96 z-20 shadow-lg rounded-md '>
              {searchResults.map((item,index) => {
                return(
                  <div>
                    {item.todo}
                  </div>
                )
              })}
        </div>}
      </div>
    </div>
      <div className='grid grid-cols-2 gap-x-10 my-10 px-10'>

        <div className=''>
            {uncompletedTodo.map((item,index) => {
              return(
                <div className='flex justify-start items-center gap-5'>
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

        <div className=''>
            {completedTodo.map((item,index) => {
              return(
                <div className='flex justify-start items-center gap-5'>
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
    </>
  )
}

export default App
