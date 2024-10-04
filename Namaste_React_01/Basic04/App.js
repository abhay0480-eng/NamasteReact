const headEl = React.createElement("h1", { className: "text-lg font-bold p-10" }, "Welcome to Reactjs Library" );
const rootEl = ReactDOM.createRoot(document.getElementById("root"))
rootEl.render(headEl)