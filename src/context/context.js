import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DataContext = createContext({})

export const DataProvider = ({children})=>{
    const location = useLocation()
    const currentPath = location.pathname;
    const [linkDivs, setLinkDivs] = useState(JSON.parse(localStorage.getItem('selectedLinks')) ||[])
    const [selectedLinks, setSelectedLinks] = useState(JSON.parse(localStorage.getItem('selectedLinks')) || [])
    const [profileDetails, setProfileDetails] = useState( JSON.parse(localStorage.getItem('profileDetails')) ||{
        'documentId':'',
        'profilePic':'',
        'firstName':'',
        'lastName':'',
        'email':'',
    })
    const [retreivedData,setRetrivedData] = useState({})
    const [emptyInput, setEmptyInput] = useState({'firstName':false,'lastName':false})
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth);
    const [saved, setSaved]= useState(false)
    const [emptyLinks, setEmptyLinks] = useState({})
    const [profilePic, setProfilePic] = useState(JSON.parse(localStorage.getItem('profilePic')) || '');
    const [copied,setCopied]= useState(false)
    const [imageFile, setImageFile] = useState('')
    const [profileDetailsStatus, setProfileDetailsStatus] = useState((localStorage.getItem('profileDetailsStatus')) || 'false')
    const [imageChange, setImageChange] = useState(false)
    const [repeatedLink, setRepeatedLink] = useState(false)
    const [saving, setSaving] = useState(false)
   /* useEffect(()=>{
        const img = new Image
        img.onload = () =>{
            setUrlValid(true)
        }
        img.onerror = () => {
            setUrlValid(false)
        }
        img.src = tempImg;
    },[tempImg])
    */
    function handleMockUpUpdate(e,text){
        if(text==='firstName'){
            setProfileDetails((prev)=>({
                ...prev,firstName:e.target.value
            }))
        }else if(text==='lastName'){
            setProfileDetails((prev)=>({
                ...prev,lastName:e.target.value
            }))
        }else if(text==='email'){
            setProfileDetails((prev)=>({
                ...prev,email:e.target.value
            }))
        }
    }

    useEffect(()=>{
        switch(currentPath){
            case "/preview":
            document.body.style.backgroundColor = "white"
            break;
            default:
            document.body.style.backgroundColor = "#f3f4f6"
        }
        
    },[currentPath])
    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth);
          
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return(
        <DataContext.Provider value={{saving, setSaving,repeatedLink, setRepeatedLink,currentPath,imageChange, setImageChange, isWideScreen,linkDivs,imageFile, setImageFile, setLinkDivs,saved, setSaved,profileDetails, setProfileDetails,handleMockUpUpdate,emptyInput, setEmptyInput,emptyLinks, setEmptyLinks,profilePic, setProfilePic,selectedLinks, setSelectedLinks,profileDetailsStatus, setProfileDetailsStatus,retreivedData,setRetrivedData,copied,setCopied}}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext