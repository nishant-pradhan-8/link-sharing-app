import { useContext, useEffect } from "react"
import DataContext from "../context/context"
import useDataBase from "../firebase"
import { useParams } from "react-router-dom"
function ProfileLink(){
    const {linkDivs,profileDetails} = useContext(DataContext)
    const {retreiveSharedUserData} = useDataBase()
    const { id } = useParams();
    async function getData(){
            await retreiveSharedUserData(id);
    }
    useEffect(()=>{
        getData()
    },[])
  
    return(
        <main style={{paddingBottom:'1rem'}} className="preview-main">
        <div className="profile-card-wrapper profile-card-wrapper-personal gap-2">
            <div style={{display:profileDetails.profilePic?'none':'block'}} className="profile-circle">
            </div>
            <div style={{display:profileDetails.profilePic?'block':'none',backgroundImage:`url(${profileDetails.profilePic})`}} className=" profile-circle bg-cover bg-no-repeat bg-center">
            </div>
            <div style={{display:profileDetails.firstName || profileDetails.lastName?'none':'block'}}   className="empty-div">
            
            </div>
            <div style={{display:profileDetails.firstName || profileDetails.lastName?'block':'none'}} className="mockup-heading-div mockup-heading-div-preview">
            <h1 className="mockup-h1  text-2xl font-semibold">{profileDetails.firstName} {profileDetails.lastName}</h1>
            </div>
            <div style={{display:profileDetails.email?'none':'block'}} className="empty-div small-empty-div"></div>
            <div style={{display:profileDetails.email?'block':'none'}} className="mockup-heading-div-email mockup-heading-div-email-preview">
            <h2 className="mockup-email mockup-email-preview">{profileDetails.email}</h2>
             </div>
             <div style={{height:'auto' }} className="social-link-div-wrapper social-link-div-wrapper-preview">
            {
              linkDivs.map((linkDiv,index)=>{
                    return <a href={linkDiv.link} target="_blank" key={index} id={linkDiv.id} className="social-link-div social-link-div-preview">
                                <div className="social-link-detail">
                                    <img src={linkDiv.selected_image}></img>
                                    <p className="social-name" >{linkDiv.selected_social}</p>
                                </div>
                                <img className="arrow-right" src="./all_images/icon-arrow-right.svg" />
                            </a>
                })
            }
        </div>
        </div>
    </main>
    )
}
export default ProfileLink