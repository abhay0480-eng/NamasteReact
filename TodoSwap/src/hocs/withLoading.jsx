import useFetchTodos from "../hooks/useApi";

const withLoading = (WrappedComponent) => {
    return (props) => {
        // Assuming you have a custom hook called useApi that returns data, error, and loading state
        
        const {todoList, loading, errors} = useFetchTodos(props.url)// Adjust the hook usage as necessary

        if (loading) {
            return <div className="spinner">Loading...</div>; // Show spinner while loading
        }

        if (errors) {
            return <div className="error">Error: {errors.message}</div>; // Handle error state
        }

        return <WrappedComponent {...props} todoList={todoList} />; // Pass data to the wrapped component
    }
}

export default withLoading