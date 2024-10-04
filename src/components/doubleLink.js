import { useContext, useEffect, useState } from "react"
import DataContext from "../context/context"
function DoubleLinkMessage(){
    const {repeatedLink} = useContext(DataContext)
    

    return(
        <div className = {`saved-message-div ${repeatedLink && "saved-message-div-active"}`} >
            <img style={{width:'48px'}}   src="./all_images/alert2.svg" />
            <p className="save-par">You cannot have two links for same social Profile!</p>
        </div>
    )
}
export default DoubleLinkMessage