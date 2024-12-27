import ReactDOM from "react-dom/client";
import App from "./RemoteComponent"

const rootElement = document.getElementById("app")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)