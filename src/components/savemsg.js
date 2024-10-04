import { useContext, useState } from "react"
import DataContext from "../context/context"
function SaveMessage(){
    const {saved} = useContext(DataContext)


    return(
        <div className = {`saved-message-div ${saved && "saved-message-div-active"}`} >
            <img  src="./all_images/icon-changes-saved.svg" />
            <p className="save-par">Your changes have been sucessfully saved!</p>
        </div>
    )
}
export default SaveMessage