import React from 'react'
import ReactDOM from 'react-dom/client'

const headingEl = React.createElement("h1", { className: "text-lg font-bold p-10" }, "Welcome to Reactjs Library" );

const HeadingComponent1 = () => {
    return <h1>Welcome to Babel</h1>
}

const HeadingComponent = () => {
    return (
        <div>
        <h1>Welcome to react js library</h1>
        <HeadingComponent1/>
        </div>
)
}
const rootEl = ReactDOM.createRoot(document.getElementById("root"))
rootEl.render(<HeadingComponent/>)