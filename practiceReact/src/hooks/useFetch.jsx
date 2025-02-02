import { useContext, useEffect, useState } from "react"
import { TodoContext } from "../context/TodoContext"

const useFetch = (url) => {
    const { setTodoData, setIsLoading, setErrors, errors }  = useContext(TodoContext)

    useEffect(() => {

        const controller = new  AbortController()
        const {signal} = controller.signal

        const fetchtodo = async() => {
            try {
                const req = await fetch(url, {signal})
                if(!req.ok){
                    throw new Error(`Http error ${req.status} ${req.statusText}`)
                }
                const res = await req.json()
                setTodoData(res.todos)
            } catch (error) {
                if(error.name !== "AbortError"){
                    setErrors(errors)
                    console.log(errors);
                    
                }
            }finally{
                setIsLoading(false)
            }
        }

        fetchtodo()

        return () => controller.abort()
    }, [])

}

export default useFetch