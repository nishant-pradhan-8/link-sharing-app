import Header from "./components/header";
import Main from './components/main';
import { Route, Routes } from "react-router-dom";
import Profile from "./components/profile";
import Preview from "./components/preview";
import { useContext, useEffect } from "react";
import DataContext from "./context/context";
import SaveMessage from "./components/savemsg";
import ProfileLink from "./components/profileLink";
import CopyMessage from "./components/copymsg";
import DoubleLinkMessage from "./components/doubleLink";
import Loader from "./components/loader";

function App() {
  const {currentPath} = useContext(DataContext)
  
  
  return (
    <div className = "app">
      <div style={{display:currentPath==="/profile"||currentPath.startsWith('/profile/')?'block':'none'}} className="overlay"></div>
       <Header />
       <Routes>
        <Route path="/" element={<Main />} ></Route>
        <Route path="/profileEdit" element={<Profile />}></Route>
        <Route path="/profile" element={<Preview />}></Route>
        <Route path="/profile/:id" element={<ProfileLink />}></Route>
       </Routes>
       <SaveMessage />
       <CopyMessage />
       <DoubleLinkMessage />
       <Loader />
    </div>
 
   
  );
}

export default App;
