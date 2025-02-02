import withLoading from './HOC/withLoading'
import ErrorBoundary from './components/ErrorBoundary'
import Todos from './components/Todos'
import SearchInput from './components/SearchInput'

const App = () => {

  return (
    <div>
        <ErrorBoundary>
          <SearchInput />
        </ErrorBoundary>
      
        <ErrorBoundary>
          <Todos />
        </ErrorBoundary>
    </div>
   
  )
}

export default withLoading(App)
