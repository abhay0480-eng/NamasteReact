import { useContext } from "react"
import useFetch from "../hooks/useFetch"
import { TodoContext } from "../context/TodoContext"


const withLoading = (WrappedComponent) => {

    return (props) => {
        useFetch(props.url)
        const {isLoading,errors} = useContext(TodoContext)

        if(isLoading){
            return <div>Loading...</div>
        }

        if(errors) {
            return <div>{errors.message}</div>
        }

        return <WrappedComponent {...props} />

    }

}

export default withLoading