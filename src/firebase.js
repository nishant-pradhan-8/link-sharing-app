import { initializeApp } from "firebase/app";
import { collection, addDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, } from "firebase/storage";
import { useContext} from "react"
import DataContext from "./context/context";

const apiKey = process.env.REACT_APP_API_KEY
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "link-sharing-app-79afc.firebaseapp.com",
  projectId: "link-sharing-app-79afc",
  storageBucket: "link-sharing-app-79afc.appspot.com",
  messagingSenderId: "174968244850",
  appId: "1:174968244850:web:9b8275548c8454034350eb"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);





function useDataBase(){
  const {profileDetails,setProfileDetails,imageChange, imageFile,setProfilePic,selectedLinks} = useContext(DataContext)
  
  const profileStore = async () => {
    const {documentId,firstName,lastName,email,profilePic} = profileDetails
    if(profileDetails.documentId!==""){
      console.log('test1')
      const userId = profileDetails.documentId;
      const userDocRef = doc(db, 'users',userId)
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
            const oldImageRef = ref(storage, `images/${documentId}`);
          await deleteObject(oldImageRef).catch((error) => {
            console.log("No image to delete or deletion error:", error);
        });
          const newImageRef = ref(storage, `images/${documentId}`);
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
        const updatedProfile = {...profileDetails,'documentId':documentId,'profilePic':newDownloadURL || profilePic,'firstName':firstName,'lastName':lastName,'email':email,}
        setProfileDetails(updatedProfile)
        localStorage.setItem('profileDetails', JSON.stringify(updatedProfile));
      }catch(err){
        console.log('Error: ',err)
      }
     
      }else{

      try {
       
        const docRef = await addDoc(collection(db, "users"), {
           profilePic:"",
           firstName:firstName,
           lastName:lastName,
           email:email,
           socialMedia:{
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
        });
        const storageRef = ref(storage, `images/${docRef.id}`);
        const metadata = {
          contentType: imageFile.type, 
        };
        await uploadBytes(storageRef, imageFile,metadata);
        
        const downloadURL = await getDownloadURL(storageRef);
        await updateDoc(docRef, {
          profilePic: downloadURL
       });
      
        const updatedProfile = {...profileDetails,'documentId':docRef.id,'profilePic':downloadURL,'firstName':firstName,'lastName':lastName,'email':email,}
        setProfileDetails(updatedProfile)
        localStorage.setItem('profileDetails', JSON.stringify(updatedProfile));

        
      } catch (err) {
        console.error("Error adding document: ", err);
      }
    }
  
  }
  const retreiveData = async (profileDetails,setRetrivedData)=>{
    const {documentId} = profileDetails
    const userDocRef = doc(db,'users',documentId);
    const docSnap = await getDoc(userDocRef)
    if (docSnap.exists()) {
      setRetrivedData(docSnap.data());
    }


  }
  return {profileStore,retreiveData}
}

export default useDataBase;