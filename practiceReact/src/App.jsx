
import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [todoList, setTodoList] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchresults, setSearchResults] = useState([])
  
  const fetchTodo = async() => {
    try {
      const req = await fetch('https://dummyjson.com/todos')
      const res = await req.json()
      setTodoList(res.todos || [])
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTodo()
  },[])

  const uncompletedTodo = todoList.filter((item) => !item.completed)
  const completedTodo = todoList.filter((item) => item.completed)

  const handleChange = (id) => {
    setTodoList(pre => pre.map((item) => item.id === id ? {...item, completed: !item.completed} : item))
  }

  const debounce = (fnc,delay) => {
    let timer;

    return (...props) => {
      timer = setTimeout(() => {
          fnc(...props)
      }, delay);
    }
  }

  const handleSearchResults = (searchQuery) => {
    let output=todoList.filter((item) => item.todo.toLowerCase().includes(searchQuery.toLowerCase()))
    setSearchResults(output)
    
  }

  const debounceSearch = debounce(handleSearchResults, 1000)

  useEffect(() => {
    debounceSearch(searchQuery)
  },[searchQuery])


  return (
    <>
    <div className='flex justify-center items-center p-5'>
      <div className='w-96 relative'>
       <input type='search' className='px-3 py-2 border-[1px] border-black rounded-lg shadow-md' onChange={(e) => setSearchQuery(e.target.value)}/>
       {searchQuery && <div className='absolute top-10 z-20 p-5 bg-white shadow-xl drop-shadow-lg rounded-md min-h-96 min-w-96'>
        {searchresults.map((item)=>{
          return (
            <div>
              <p>{item.todo}</p>
            </div>
          )
        })}
       </div> }
      </div>
    </div>
      <div className='grid grid-cols-2 gap-x-10 my-10 px-10'>

        <div className=''>
            {uncompletedTodo.map((item,index) => {
              return (
                <div key={item.id} className='flex justify-start items-center gap-x-3 '>
                  <div>
                    <input type='checkbox' checked={item.completed} onChange={() => handleChange(item.id)} />
                  </div>
                  <div>
                    <p>{item.todo}</p>
                  </div>
                </div>
              )
            })}
        </div>

        <div className=''>
        {completedTodo.map((item,index) => {
              return (
                <div key={item.id} className='flex justify-start items-center gap-x-3 '>
                  <div>
                    <input type='checkbox' checked={item.completed} onChange={() => handleChange(item.id)} />
                  </div>
                  <div>
                    <p>{item.todo}</p>
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
