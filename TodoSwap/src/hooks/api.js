import { useQuery } from "@tanstack/react-query"
import axios from 'axios';

  function useFetchData(endpoint, params = {}){

    

    const fetchTodo = async() => {
        try {
            const response = await axios.get(endpoint, {params})
            return response.data
            
        } catch (error) {
            console.error(`Error fetching post from ${endpoint}`, error);
            throw error
        }
    }

    const {data,error,isError,isFetched,isLoading} = useQuery({
        queryKey: [endpoint, params],
        queryFn: fetchTodo,
        staleTime: 5000,
        cacheTime: 10000,
        refetchOnWindowFocus: true,
        retry: 2,
        onError: (err) => {
            console.error(`Query failed: ${endpoint}`, err.message);
            alert(`Failed to fetch data from ${endpoint}. Please try again later.`);
        }
    });

    return {data,error,isError,isFetched,isLoading}

  }

  export default useFetchData;