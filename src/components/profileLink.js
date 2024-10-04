import { useContext, useEffect } from "react"
import DataContext from "../context/context"
import useDataBase from "../firebase"
function ProfileLink(){
    const {retreivedData,linkDivs,setRetrivedData,profileDetails} = useContext(DataContext)
    const {retreiveData} = useDataBase()
   
    
    const linkArr = retreivedData?.socialMedia ? Object.values(retreivedData.socialMedia) : [];
    useEffect(() => {
        if (profileDetails && profileDetails.documentId) {
          retreiveData(profileDetails, setRetrivedData);
          console.log(linkArr)
        }
      }, []);
    return(
        <main style={{paddingBottom:'1rem'}} className="preview-main">
        <div className="profile-card-wrapper profile-card-wrapper-personal gap-2">
            <div style={{display:retreivedData.profilePic?'none':'block'}} className="profile-circle">
            </div>
            <div style={{display:retreivedData.profilePic?'block':'none',backgroundImage:`url(${retreivedData.profilePic})`}} className=" profile-circle bg-cover bg-no-repeat bg-center">
            </div>
            <div style={{display:retreivedData.firstName || retreivedData.lastName?'none':'block'}}   className="empty-div">
            
            </div>
            <div style={{display:retreivedData.firstName || retreivedData.lastName?'block':'none'}} className="mockup-heading-div mockup-heading-div-preview">
            <h1 className="mockup-h1  text-2xl font-semibold">{retreivedData.firstName} {retreivedData.lastName}</h1>
            </div>
            <div style={{display:retreivedData.email?'none':'block'}} className="empty-div small-empty-div"></div>
            <div style={{display:retreivedData.email?'block':'none'}} className="mockup-heading-div-email mockup-heading-div-email-preview">
            <h2 className="mockup-email mockup-email-preview">{retreivedData.email}</h2>
             </div>
             <div style={{height:'auto' }} className="social-link-div-wrapper social-link-div-wrapper-preview">
            {
              linkDivs.map((linkDiv,index)=>{
                    return <a href={linkDiv.link} target="_blank" style={{display:linkArr.includes(linkDiv.link)? 'flex':'none'}} key={index} id={linkDiv.id} className="social-link-div social-link-div-preview">
                                <div className="social-link-detail">
                                    <img src={linkDiv.selected_image}></img>
                                    <p className="social-name" >{linkDiv.selected_social}</p>
                                </div>
                                <img className="arrow-right" src="/all_images/icon-arrow-right.svg" />
                            </a>
                })
            }
        </div>
        </div>
    </main>
    )
}
export default ProfileLink