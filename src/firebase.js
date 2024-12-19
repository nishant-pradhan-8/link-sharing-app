import { initializeApp } from "firebase/app";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, } from "firebase/storage";
import { useContext, useEffect} from "react"
import DataContext from "./context/context";
import { getAuth } from "firebase/auth";

import { setDoc } from "firebase/firestore";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const apiKey = process.env.REACT_APP_API_KEY
const authDomain = process.env.REACT_APP_AUTH_DOMAIN
const projectId = process.env.REACT_APP_PROJECT_ID
const storageBucket = process.env.REACT_APP_STORAGE_BUCKET
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID
const appId = process.env.REACT_APP_APP_ID
console.log(authDomain)
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
export const auth = getAuth();




function useDataBase(){
  const {profileDetails,setProfileDetails, setSelectedLinks,setLinkDivs,setProfileNotSet,imageChange,user, setUser, imageFile,selectedLinks} = useContext(DataContext)
 
  useEffect(()=>{
    const subscription = onAuthStateChanged(auth,(user) => {
      if (user) {
       const uid = user.uid;
       setUser(uid)
      }else{
        setUser(null)
      }
    });
    return ()=>subscription();
},[])
  
 
  const retreiveData = async ()=>{
    if (user){
      const userDocRef = doc(db,'users',user);
      const docSnap = await getDoc(userDocRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        const socialMedia = data.socialMedia
        let socials = []
        let tempId = 1; 
        for (let keys in socialMedia){
          if(socialMedia[keys]!==""){
            let socialObj = {'id':tempId,'selected_image':`./all_images/icon-${keys}-gray.svg`,'selected_social':`${keys}`,'link':`${socialMedia[keys]}`}
            tempId++
            socials.push(socialObj)
          }
        }
    
        setLinkDivs(socials)
        setSelectedLinks(socials)
        setProfileDetails((prev)=>({
          ...prev, 'profilePic':data.profilePic, 'firstName':data.firstName,'lastName':data.lastName,'email':data.email
          
        }))
      
        
      }else{
        console.log('not working')
      }
    }
    
  }

  const retreiveSharedUserData = async (user)=>{
    if (user){
      const userDocRef = doc(db,'users',user);
      const docSnap = await getDoc(userDocRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        const socialMedia = data.socialMedia
        let socials = []
        let tempId = 1; 
        for (let keys in socialMedia){
          if(socialMedia[keys]!==""){
            let socialObj = {'id':tempId,'selected_image':`./all_images/icon-${keys}-gray.svg`,'selected_social':`${keys}`,'link':`${socialMedia[keys]}`}
            tempId++
            socials.push(socialObj)
          }
        }
    
        setLinkDivs(socials)
        setSelectedLinks(socials)
        setProfileDetails((prev)=>({
          ...prev, 'profilePic':data.profilePic, 'firstName':data.firstName,'lastName':data.lastName,'email':data.email
          
        }))
      
        
      }else{
        console.log('not working')
      }
    }
    
  }



  const updateProfile = async () => {
    const {profilePic,firstName,lastName,email,} = profileDetails
    if(profileDetails.firstName===""){
      setProfileNotSet(true)
      return
    }
    setProfileNotSet(false)
      const userDocRef = doc(db, 'users',user)
      const socialMedia = {
              "Github":'',
              "frontend Mentor":'',
              "Twitter":'',
              "Linkedin":'',
              "Youtube":'',
              "Facebook":'',
              "Twitch":'',
              "Dev.To":'',
              "Codewars":'',
              "Codepen":'',
              "freeCodeCamp":'',
              "GitLab":'',
              "Hashnode":'',
              "Stack Overflow":'',
     }
     selectedLinks.forEach((linkDiv)=>{
      if(linkDiv.selected_social in socialMedia){
        socialMedia[linkDiv.selected_social] = linkDiv.link
      }
     })
     let newDownloadURL;
  
     if(imageChange){
            const oldImageRef = ref(storage, `images/${user}`);
          await deleteObject(oldImageRef).catch((error) => {
            console.log("No image to delete or deletion error:", error);
        });
          const newImageRef = ref(storage, `images/${user}`);
          const metadata = {
            contentType: imageFile.type, 
          };
          await uploadBytes(newImageRef, imageFile, metadata);
          newDownloadURL = await getDownloadURL(newImageRef);
      }
      try{
        await updateDoc(userDocRef,{
          profilePic: newDownloadURL || profilePic,
          firstName:firstName,
          lastName:lastName,
          email:email,
          socialMedia:socialMedia,
        })
        const updatedProfile = {...profileDetails,'profilePic':newDownloadURL || profilePic,'firstName':firstName,'lastName':lastName,'email':email,}
        setProfileDetails(updatedProfile)
      
      }catch(err){
        console.log('Error: ',err)
      }

}
  const createProfile = async (uid)=>{
    const {profilePic,firstName,lastName,email} = profileDetails
    try {
      await setDoc(doc(db,'users',uid),{
        profilePic:profilePic,
        firstName:firstName,
        lastName:lastName,
        email:email,
        socialMedia:{
           "github":'',
           "Frontend Mentor":'',
           "twitter":'',
           "linkedin":'',
           "youtube":'',
           "facebook":'',
           "twitch":'',
           "Dev.To":'',
           "codewars":'',
           "codepen":'',
           "freecodecamp":'',
           "gitlab":'',
           "hashnode":'',
           "Stack Overflow":'',
        }
      })
      const profilePicRef = ref(storage,`images/${uid}`);
      const metadata = {
        contentType: imageFile.type, 
      };
      await uploadBytes(profilePicRef, imageFile,metadata);
      
      const downloadURL = await getDownloadURL(profilePicRef);
      const docRef = doc(db,'users',user)
      await updateDoc(docRef, {
        profilePic: downloadURL
     });
    
      const updatedProfile = {...profileDetails,'profilePic':downloadURL,'firstName':firstName,'lastName':lastName,'email':email,}
      setProfileDetails(updatedProfile)
     
      
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  
  }
  return {updateProfile,retreiveData,createProfile, retreiveSharedUserData}
}
export default useDataBase;