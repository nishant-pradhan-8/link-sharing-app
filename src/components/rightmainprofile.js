import RightMainHeader from "./rightmainheader"
import ProfilePicture from "./profilepicture"
import ProfileDetails from "./profiledetails"
import RightMainSaveProfile from "./rightmainsaveprofile"
function RightMainProfile(){
    return(
        <section className = "details-section">
        <RightMainHeader />
        <form onSubmit={(e)=>e.preventDefault()} className="rm-div-wrapper">
            <ProfilePicture />
            <ProfileDetails />
        </form>
        
        <RightMainSaveProfile />
    </section>
    )
}
export default RightMainProfile