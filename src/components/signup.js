
import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useDataBase from "../firebase";
import { useContext } from "react";
import DataContext from "../context/context";
import AuthSaving from "./authenticationLoader";
export default function SignUp(){
    const {authLoader, setAuthLoader} = useContext(DataContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [usedEmailError, setUsedEmailError] = useState(false)
    const {createProfile} = useDataBase()
    function handleSignUp(){ 
        if(email.trim()===""){
            setEmailError(true);
            return
        }
        setAuthLoader(true)
        setEmailError(false)
        setPasswordError(false)
        setUsedEmailError(false)

    
      
        if(password!==confirmPassword || password.length<6){
            setPasswordError(true)
            setAuthLoader(false)
            return
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
            setAuthLoader(false)
          const user = userCredential.user;
          await createProfile(user.uid)
          navigate("/")
        })
        .catch((error) => {
            setAuthLoader(false)
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
          if(errorMessage === 'Firebase: Error (auth/email-already-in-use).'){
            setUsedEmailError(true)
          }else{
            setEmailError(true)
          }
         
        });
       
    }
    return <main className="authentication-main ">
    <div className="authentication-container">
    <div className="authentication-div">
            <img src="./all_images/logo-devlinks-large.svg" />
        </div>
    <div className="authenticaltion-div auth-reg">
        <div className="authentication-text-div">
        <h1 className="primary-heading">Create Account</h1>
        <p className="primary-paragraph">Let’s get you started sharing your links!</p>
        </div>
               
                <form className="authentication-form" onSubmit={(e)=>e.preventDefault()}>
                    <div className="input-div">
                        <label className="authentication-label" htmlfor="email">Email address</label>
                        <div className="input-field-div">
                          
                            <input style={{borderColor:emailError?'red':'#d9d9d9'}} required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="authentication-input" placeholder="Enter your email " />
                        </div>
                    </div>
                    <div className="input-div">
                        <label  className="authentication-label" htmlfor="password">Password</label>
                        <div className="input-field-div">
                            <input  style={{borderColor:passwordError?'red':'#d9d9d9'}} required  value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="authentication-input"  placeholder="At least 6 character" />
                        </div>
                    </div>
                    <div className="input-div">
                        <label  className="authentication-label" for="password">Confirm Password</label>
                        <div className="input-field-div">
                            <input  style={{borderColor:passwordError?'red':'#d9d9d9'}} required  value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  type="password" className="authentication-input"  placeholder="At least 6 character" />
                        </div>
                    </div>
                    <p className="paragraph" style={{color:'red',display:passwordError?'block':'none',fontSize:'0.8rem'}}>*The password donot match or the password is less than 6 characters</p>
                    <p className="paragraph" style={{color:'red',display:emailError?'block':'none',fontSize:'0.8rem'}}>*Please enter a valid Email!</p>
                    <p className="paragraph" style={{color:'red',display:usedEmailError?'block':'none',fontSize:'0.8rem'}}>*Email already registered. Please Login!</p>
                    <button onClick={handleSignUp} className="primary-btn authentication-btn">
                        {authLoader? <AuthSaving />:"SignUp"}  
                    </button>
                </form>
                <p className="primary-paragraph">Already have an account? <a href="/link-sharing-app/#/login" className="create-account-a">Login</a> </p>
    </div>
    </div>
       
</main>
}

