import { useContext } from "react";
import DataContext from "../context/context";
function RightMainHeader(){
    const {currentPath} = useContext(DataContext)
    let heading = "";
    let paragraph = "";

    if(currentPath==="/"){
        heading = "Customize your links";
        paragraph = "Add/edit/remove links below and then share all your profile with the world!"
    }else if(currentPath==="/profileEdit"){
        heading = "Profile Details"
        paragraph = "Add your details to create a personal touch to your profile."
    }
    return(
        <div className="rmh-wrapper">
            <h1 className="primary-heading">{heading}</h1>
            <p className="primary-paragraph">{paragraph}</p>
        </div>

    )
}
export default RightMainHeader