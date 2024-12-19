import { useContext } from "react";
import DataContext from "../context/context";
import { auth} from "../firebase";
import { signOut } from "firebase/auth";

function RightMainHeader(){
    const {currentPath,navigate} = useContext(DataContext)
    let heading = "";
    let paragraph = "";
   
    if(currentPath==="/"){
        heading = "Customize your links";
        paragraph = "Add/edit/remove links below and then share all your profile with the world!"
    }else if(currentPath==="/profileEdit"){
        heading = "Profile Details"
        paragraph = "Add your details to create a personal touch to your profile."
    }

    const handleSignOut=()=>{
        signOut(auth).then(()=>{
            navigate('/login')
            window.location.reload();
        })
    }

    return(
        <div className="rmh-div">
<div className="rmh-wrapper">
            <h1 className="primary-heading">{heading}</h1>
            <p className="primary-paragraph">{paragraph}</p>
        
        </div>
        <button style={{display:currentPath==="/"?'none':'block'}} onClick={handleSignOut} className="primary-btn signout-btn">
            Sign Out
        </button>

        </div>
        
    )
}
export default RightMainHeader