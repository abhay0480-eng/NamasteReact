import { useEffect, useState } from "react"

const useFetchTodos = (url) => {
    const [todoList, setTodoList]  = useState([])
    const [loading, setLoading]  = useState(true)
    const [errors, setErrors]  = useState(null)
    
    useEffect(() => {
      const controller = new AbortController()
      const {signal} = controller.signal
    
      const fetchTodo = async() => {
        try {
          const req = await fetch(url,{signal})
          if(!req.ok){
            throw new Error(`Http error: ${req.status} ${req.statusText}`)
          }
          const res = await req.json()
          setTodoList(res.todos)
          setErrors(null)
    
        } catch (error) {
          if(error.name !== "AbortError"){
            setErrors(error.message)
            console.log("fetchError", error);
            
          }
        }finally{
          setLoading(false)
        }
      }
    
      fetchTodo()
    
      return () => controller.abort()
    },[])

    return {todoList, loading, errors}
}

export default useFetchTodos




