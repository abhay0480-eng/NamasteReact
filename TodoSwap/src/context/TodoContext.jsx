import { createContext, useState } from "react";

export const TodoContext = createContext()

export const TodoProvider = ({children}) => {
    const [todoData, setTodoData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    return (
        <TodoContext.Provider value={{todoData, setTodoData,isLoading,setIsLoading, errors, setErrors}}>
            {children}
        </TodoContext.Provider>
    )
}