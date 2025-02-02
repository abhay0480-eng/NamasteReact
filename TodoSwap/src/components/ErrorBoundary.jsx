import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI
        return { hasError: true, error: error };
    }

    componentDidCatch(error, info) {
        console.error("Error caught in ErrorBoundary:", error, info);
    }

    render() {
        

        if (this.state.hasError) {
            return <h1>Something Went Wrong</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;