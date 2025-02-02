import React, { useCallback, useContext, useMemo } from 'react'
import { TodoContext } from '../context/TodoContext';

const Todos = () => {
    const { todoData, setTodoData } = useContext(TodoContext);

    const unCompleted = useMemo(() => {
        return todoData.filter((item) => !item.completed)
     }, [todoData])
   
     const completed = useMemo(() => {
       return todoData.filter((item) => item.completed)
    }, [todoData])
   
   
    const handleChange = useCallback((id) => {
     setTodoData(pre => pre.map((item) => item.id === id ? {...item, completed: !item.completed} : item))
    },[])



  return (
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
  )
}

export default Todos
