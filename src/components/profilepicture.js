import { useContext, useState } from "react";
import DataContext from "../context/context";
function ProfilePicture(){
    const { profileDetails,setImageChange, setProfileDetails,profilePic, setProfilePic,imageFile, setImageFile,urlValid} = useContext(DataContext)
    const [errorImageUpload, setErrorImageUpload] = useState(false)
    

    function handleImageUpload(e){
        setErrorImageUpload(false)
        setImageChange(true)
        const file = e.target.files[0];
       
        const allowedTypes = ['image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.type)) {
            setErrorImageUpload(true);
            return; 
        }
      
        const img = new Image();

        img.onload = () => {
          
            if (img.width <= 1024 && img.height <= 1024) {
                setImageFile(file)
                
                setProfileDetails((prev)=>({
                    ...prev,profilePic:URL.createObjectURL(file)
                }))  
            } else {
                setErrorImageUpload(true); 
            }
        };
        const reader = new FileReader();
        reader.onload = function(event) {
             img.src = event.target.result; 
        }
        reader.readAsDataURL(file);

    }
    return(
        <fieldset className="rm-div image-form-div form-div">
            <h2 className="form-heading">Profile Picture</h2>
            <div className="profile-pic-input-wrapper">
            <label style={{ backgroundImage: `url(${profileDetails.profilePic})` }}
 htmlFor="profile-picture" className="pp-label bg-no-repeat bg-center bg-cover">
                <img src="./all_images/icon-upload-image.svg" />
                 <input accept=".jpg, .jpeg, .png" onChange={(e)=>handleImageUpload(e)} type="file" id="profile-picture" name="profile-picture" />
                 <p className="upload-img-text">+ Upload Image</p>
            </label>
            <div className="profile-message-div">
            <p className="image-upload-message upload-message">Image must be below 1024x1024px. Use PNG or JPG format</p>
            <p style={{display:errorImageUpload?'block':'none'}} className="text-[0.75rem] mt-4 text-red-600 w-[11rem]">*Image is too large or file is not in specified format</p>
            </div>
            </div>
        </fieldset>
      
    )
}
export default ProfilePicture