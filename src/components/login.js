import { useState } from "react"
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import AuthSaving from "./authenticationLoader"
import { useContext } from "react"
import DataContext from "../context/context"
export default function Login(){
    const {setAuthLoader, authLoader} = useContext(DataContext)
    const navigate = useNavigate("/")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(false)
    const handleLogin = ()=>{
        if(email.trim()==="" && password.trim()===""){
            setLoginError(true)
           
            return
        }
        setAuthLoader(true)
        setLoginError(false)
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setAuthLoader(false)
            const user = userCredential.user;
            navigate("/")
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setLoginError(true)
            setAuthLoader(false)
        });
    }
    return <main className="authentication-main">
        <div className="authentication-container">
        <div className="authentication-div">
                <img src="./all_images/logo-devlinks-large.svg" />
            </div>
        <div className="authenticaltion-div">
            <div className="authentication-text-div">
            <h1 className="primary-heading">Login</h1>
            <p className="primary-paragraph">Add your details below to get back into the app</p>
            </div>
                   
                    <form className="authentication-form" onSubmit={(e)=>e.preventDefault()}>
                        <div className="input-div">
                            <label className="authentication-label" htmlfor="email">Email address</label>
                            <div className="input-field-div">
                              
                                <input value={email} required onChange={(e)=>setEmail(e.target.value)} type="email" className="authentication-input" placeholder="Enter your email " />
                            </div>
                        </div>
                        <div className="input-div">
                            <label  className="authentication-label" htmlfor="password">Password</label>
                            <div className="input-field-div">
                                <input value={password} required onChange={(e)=>setPassword(e.target.value)} type="password" className="authentication-input"  placeholder="Enter your password" />
                            </div>
                        </div>
                        <p className="paragraph" style={{color:'red',display:loginError?'block':'none',fontSize:'0.8rem'}}>*Invalid email or passwrod. Please try again!</p>
                        
                        <button onClick={handleLogin} className=" flex items-center gap-2 justify-center primary-btn authentication-btn">
                          {authLoader? <AuthSaving />:"Login"}  
                        </button>
                        
                       
                    </form>
                    <p className="primary-paragraph">Don't have an account? <a href="/link-sharing-app/#/signup" className="create-account-a">Create account</a> </p>
        </div>
        </div>
           
</main>
}

