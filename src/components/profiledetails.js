import { useContext } from "react"
import DataContext from "../context/context"
function ProfileDetails(){
    const {handleMockUpUpdate,lastName,profileDetails, email,firstName,emptyInput} = useContext(DataContext)
    return(
        <fieldset className="rm-div form-div">
        <div className="input-div">
            <label htmlFor="first_name" className="form-heading">First Name*</label>
            <input value={profileDetails.firstName}  onChange={(e)=>handleMockUpUpdate(e,'firstName')} type="text" id="first_name" className={`${emptyInput['firstName']?'details-inputfield profile-details-error':'details-inputfield'}`} placeholder="e.g John" required />
        </div>
        <div className="input-div">
            <label htmlFor="last_name" className="form-heading">Last Name*</label>
            <input onChange={(e)=>handleMockUpUpdate(e,'lastName')} value={profileDetails.lastName} type="text" id="last_name" className={`${emptyInput['lastName']?'details-inputfield profile-details-error':'details-inputfield'}`} placeholder="e.g Appleseed"  required/>
        </div>
        <div className="input-div">
            <label htmlFor="email" className="form-heading">Email</label>
            <input onChange={(e)=>handleMockUpUpdate(e,'email')} value={profileDetails.email}  type="email" id="email" className="details-inputfield" placeholder="e.g email@example.com" />
        </div>
    </fieldset>
    )
}
export default ProfileDetails