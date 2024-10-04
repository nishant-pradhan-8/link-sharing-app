import { useContext } from "react"
import DataContext from "../context/context"


function LinkBoxHeader({id}){
    const {linkDivs, setLinkDivs, selectedLinks, setSelectedLinks} = useContext(DataContext)
  
    function handleRemove(id){
        let filteredLinkDivs = selectedLinks.filter(linkdiv=>linkdiv.id!==id)
       
        setSelectedLinks(filteredLinkDivs)

       
    }
    return(
        <div className="social-link-box-header">
                        <div className="slb-left">
                            <img src="./all_images/icon-drag-and-drop.svg" />
                            <h2 className="link-index">Link {id}</h2>
                        </div>
                        <div className="slb-right">
                            <button onClick={()=>handleRemove(id)} className="remove-btn">Remove</button>
                        </div>
         </div>
    )
}
export default LinkBoxHeader