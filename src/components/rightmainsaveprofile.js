import { useContext, useEffect} from "react"
import DataContext from "../context/context"
import useDataBase from "../firebase"
function  RightMainSaveProfile(){
    const {  setSaving,setSaved,linkDivs,profileDetailsStatus, setProfileDetailsStatus, profileDetails,setProfileDetails, setEmptyInput, emptyInput,selectedLinks} = useContext(DataContext)
    const {profileStore} = useDataBase()
    async function handleSave(){
            setSaving(true)
            if(profileDetails.firstName !== "" && profileDetails.lastName !== ""){
            setProfileDetailsStatus(true)
            localStorage.setItem('profileDetailsStatus',true)
            setEmptyInput({'firstName':false,'lastName':false})
            await profileStore(selectedLinks)
            setSaving(false)
            setSaved(true)
            
            setTimeout(()=>{
                setSaved(false)
            },2000)
            console.log(profileDetails)
            
        }
            else{
                if(profileDetails.firstName===""&&profileDetails.lastName===""){
                    const updatedEmptyStatus = {...emptyInput,'firstName':true,'lastName':true}
                    setEmptyInput(updatedEmptyStatus)
                }else if(profileDetails.firstName===""){
                    setEmptyInput({'firstName':true,'lastName':false})
                }else if(profileDetails.firstName===""){
                    setEmptyInput({'firstName':false,'lastName':true})
                }
            }
        }
       
    
    
    return(
        <div className="rms-wrapper">
            <button onClick={handleSave}  className="primary-btn save-btn">
                Save
            </button>
        </div>
    )
}
export default RightMainSaveProfile