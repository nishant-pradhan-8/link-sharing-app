import { useContext, useState } from "react"
import DataContext from "../context/context"
function CopyMessage(){
    const {copied} = useContext(DataContext)

    return(
        <div className = {`saved-message-div ${copied && "saved-message-div-active"}`}>
            <img  src="./all_images/icon-link-copied-to-clipboard.svg" />
            <p className="save-par">The link has been copied to your clipboard</p>
        </div>
    )
}
export default CopyMessage