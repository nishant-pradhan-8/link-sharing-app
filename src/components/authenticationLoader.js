import { useContext } from "react"
import DataContext from "../context/context"
export default function AuthSaving(){
    const {authLoader} = useContext(DataContext)
    return(
        <div style={{display:authLoader?"block":"none"}} className="loader"></div>
    )
}