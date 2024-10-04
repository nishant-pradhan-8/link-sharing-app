import { useContext, useState} from "react"
import DataContext from "../context/context"

export default function Loader(){
    const {saving} = useContext(DataContext)
    return(
        <div className = {`saved-message-div ${saving && "saved-message-div-active"}`} >
        <div class="loader"></div>
        <p className="save-par">Saving</p>
         </div>
    )
}