import { useContext, useState } from "react"
import { AuthContext } from "./context/AuthContentProvider"
import Counter from "./components/Counter";




const App = () => {
    let store = useContext(AuthContext)
    console.log(store);
    return (
        <div> <Counter/></div>

    )
}

export default App