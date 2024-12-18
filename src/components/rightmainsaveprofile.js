import { useContext, useEffect } from "react";
import DataContext from "../context/context";
import useDataBase from "../firebase";
function RightMainSaveProfile() {
  const {
    setSaving,
    setSaved,
    setProfileDetailsStatus,
    profileDetails,
    setEmptyInput,
    emptyInput,
    selectedLinks,
  } = useContext(DataContext);
  const { updateProfile } = useDataBase();
  async function handleSave() {
    setSaving(true);
    if (profileDetails.firstName !== "" && profileDetails.lastName !== "") {
  
      setEmptyInput({ firstName: false, lastName: false });
      await updateProfile();
      setSaving(false);
      setSaved(true);
      

      setTimeout(() => {
        setSaved(false);
      }, 2000);
      console.log(profileDetails);
    } else {
      if (profileDetails.firstName === "" && profileDetails.lastName === "") {
        const updatedEmptyStatus = {
          ...emptyInput,
          firstName: true,
          lastName: true,
        };
        setEmptyInput(updatedEmptyStatus);
      } else if (profileDetails.firstName === "") {
        setEmptyInput({ firstName: true, lastName: false });
      } else if (profileDetails.firstName === "") {
        setEmptyInput({ firstName: false, lastName: true });
      }
    }
  }

  return (
    <div className="rms-wrapper">
      <button onClick={handleSave} className="primary-btn save-btn">
        Save
      </button>
    </div>
  );
}
export default RightMainSaveProfile;
