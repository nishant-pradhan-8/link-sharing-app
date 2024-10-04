import LogoNav from "./logoNav"
import MainNav from "./mainNav"
import PreviewNav from "./previewNav"
import { useContext, useEffect } from "react";
import DataContext from "../context/context";


function Header(){
    const {currentPath} = useContext(DataContext)
    return(

        <header style={{display:currentPath.startsWith("/profile/")?'none':'block'}}>
            <nav className ="nav">
                <LogoNav />
                <MainNav />
                <PreviewNav /> 
            </nav>
        </header>
    )
}
export default Header