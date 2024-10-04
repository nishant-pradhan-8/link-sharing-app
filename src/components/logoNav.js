import { useContext } from "react"
import DataContext from "../context/context"
function LogoNav(){
    const {currentPath} = useContext(DataContext)
    return(
        <div style={{display:currentPath==="/profile"?'none':'block'}}  className="left-Section-Nav">
           <picture>
            <source media="(max-width:768px)" srcSet="/all_images/logo-devlinks-small.svg"></source>
            <img src="/all_images/logo-devlinks-large.svg"/>
           </picture>
            
        </div>
    )
}
export default LogoNav