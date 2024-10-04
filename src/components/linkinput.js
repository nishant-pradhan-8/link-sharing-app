import { useContext, useState } from "react"
import DataContext from "../context/context"
function InputLink({id,link}){
    const{emptyLinks,setSelectedLinks,selectedLinks} = useContext(DataContext);
    function handleLinkInput(e,id){
       let updatedLinkDivs = selectedLinks.map((selectedLink)=>{
            if(selectedLink.id===id){
                return {...selectedLink,'link':e.target.value}
            }
            return selectedLink
        })
        setSelectedLinks(updatedLinkDivs)
    }
    return(
        <fieldset  >
            <label id="link" className="link-input-heading">Link</label>
            <div className="url-div-wrapper">
                <img className="link-input-icon" src="all_images/icon-link.svg" />
                <input className={`${emptyLinks[id]&&'profile-details-error'}`} value={link} onChange={(e)=>handleLinkInput(e,id)} id={`link-${id}`} type="url" placeholder="e.g. https://example.com" />
            </div>
            
        </fieldset>
    )
}
export default InputLink