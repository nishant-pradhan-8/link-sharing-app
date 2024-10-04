import Dropdown from "./dropdown"
import LinkBoxHeader from "./linkboxheader"
import InputLink from "./linkinput"
import { useState } from "react"
import { useContext } from "react"
import DataContext from "../context/context"


function RightMainLink(){
 
    const {setSelectedLinks,selectedLinks} = useContext(DataContext)
   
    function handleAddLink(){
        let linkDiv = {}
        if(selectedLinks.length===0){
            linkDiv = {'id':1,'selected_image':"./all_images/icon-github-gray.svg",'selected_social':'Github','link':''}
        }
        else{
            linkDiv = {'id':selectedLinks[selectedLinks.length - 1].id +1,'selected_image':"./all_images/icon-github-gray.svg",'selected_social':'Github','link':''}
        }
    
        const newLinkDivs = [...selectedLinks,linkDiv]
        
        setSelectedLinks(newLinkDivs)
    }
    return(
        <div className="rml-wrapper">
            <button onClick={handleAddLink} className="primary-btn add-link-btn">
                + Add new link
            </button>
            <div className="rm-div-wrapper">
                <div style={{display:selectedLinks.length===0?'flex':'none'}} className="rm-div rm-div-no-links">
                <img src="./all_images/illustration-empty.svg" />
                <h1 className="primary-heading text-center">Let's get you started</h1>
                <p className="primary-paragraph text-center">Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your profiles with everyone!</p>
                </div>
               { selectedLinks.length!==0 &&
                selectedLinks.map((linkdiv, index)=>{
                    return <div id={linkdiv.id} key={index}>
                        <div className="rm-div">
                            <LinkBoxHeader id = {linkdiv.id} />
                        <form onSubmit={(e)=>e.preventDefault()} className="social-link-fieldset">
                            <Dropdown id = {linkdiv.id} index={index}  />
                            <InputLink id={linkdiv.id} link = {linkdiv.link} />
                        </form>
                        </div>
                        </div>
                })
               }
            </div>
        </div>
    )
}
export default RightMainLink