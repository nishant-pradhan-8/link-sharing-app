import { useContext } from "react"
import DataContext from "../context/context"
function LeftMain(){
    const {isWideScreen,profilePic,firstName,lastName,email, selectedLinks,tempImg,profileDetails,urlValid} = useContext(DataContext)
    return(
        <section style={{display:isWideScreen>=1024?'flex':'none'}} className="mockup-section" >
            <img className="phone-mockup" src="./all_images/illustration-phone-mockup.svg" />
            <div style={{display:profileDetails.profilePic?'block':'none',backgroundImage:`url(${profileDetails.profilePic})`}} className="profile-pic-mockup bg-cover bg-no-repeat bg-center">
            </div>
            <div style={{display:profileDetails.firstName || profileDetails.lastName?'block':'none'}} className="mockup-heading-div">
                <h1 className="mockup-h1">{profileDetails.firstName} {profileDetails.lastName}</h1>
            </div>
            <div className="mockup-heading-div-email">
                <h2 className="mockup-email">{profileDetails.email}</h2>
            </div>
            <div className="social-link-div-wrapper">
                {
                    selectedLinks.map((linkDiv,index)=>{
                        return <a href={selectedLinks.link} target="_blank" key={index} id={linkDiv.id} className="social-link-div">
                                    <div className="social-link-detail">
                                        <img src={linkDiv.selected_image}></img>
                                        <p className="social-name" >{linkDiv.selected_social}</p>
                                    </div>
                                    <img className="arrow-right" src="./all_images/icon-arrow-right.svg" />
                                </a>
                    })
                }
                
            </div>
        </section>
    )
}
export default LeftMain