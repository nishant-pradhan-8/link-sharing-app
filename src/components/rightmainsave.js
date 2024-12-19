import { useContext, useState} from "react"
import DataContext from "../context/context"
import useDataBase from "../firebase"
function RightMainSave(){
    const { setSaved,setEmptyLinks,setSaving,profileNotSet, setProfileNotSet,setProfileDetailsStatus, setRepeatedLink,selectedLinks,profileDetailsStatus,setLinkDivs} = useContext(DataContext)
    const {updateProfile} = useDataBase()
    
    const [noLinksMsg, setNoLinksMsg] = useState(false)
    const [linkFormatNotValid,setLinkFormatNotValid] = useState(false);
    const checkLinkFormat = ()=>{
        for(let i = 0; i<selectedLinks.length; i++){
            if(!(selectedLinks[i].link.startsWith("https://"))){
                setLinkFormatNotValid(true);
                return false
            }
        }
        return true
    }
    
   async function handleSave(){
       if(!checkLinkFormat()){
        return
       };
       setLinkFormatNotValid(false);
        setSaving(true)
        setEmptyLinks({})
        if(selectedLinks.length===0){
            setSaving(false)
            return setNoLinksMsg(true)
        }
        setNoLinksMsg(false)
        let newError = {}
        selectedLinks.map((linkDiv)=>{
            if(linkDiv.link.trim()===""){
               return newError[linkDiv.id] = true
            }
        })
        let temp;
        for(let i = 0; i<selectedLinks.length; i++){
            temp = selectedLinks[i].selected_social
            for(let j = 0; j<selectedLinks.length; j++){
                if(selectedLinks[j].selected_social===temp && i!==j){
                    setRepeatedLink(true)
                    setSaving(false)
                    setTimeout(()=>{
                        setRepeatedLink(false)
                    },3000)
                    return
                }
            }
        }

        if (Object.keys(newError).length===0){
           await updateProfile()
            setSaving(false)
            setSaved(true)
            setTimeout(()=>{
                setSaved(false)
            },3000)
        }else{
            setSaving(false)
            setEmptyLinks(newError)
        }
    }
    return(
        <div  className="rms-wrapper flex justify-between items-center">
            <p style={{display:profileNotSet?'block':'none'}} className="text-red-500" >Please fill your profile details first!</p>
            <p style={{display:linkFormatNotValid?'block':'none'}} className="text-red-500" >Please Start Your Link with <b>"https://"</b></p>
            <p style={{visibility:noLinksMsg?'visible':'hidden'}} className="text-red-500" >Please add atleat one link!</p>
           
            <button onClick={handleSave}  className="primary-btn save-btn">
                Save
            </button>
        </div>
    )
}
export default RightMainSave