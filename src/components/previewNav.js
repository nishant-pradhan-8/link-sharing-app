import { useContext, useState } from "react"
import DataContext from "../context/context"
import { useNavigate, useSearchParams } from "react-router-dom"


function PreviewNav(){
    const navigate = useNavigate()
    const{currentPath, isWideScreen,profileDetails,setCopied} = useContext(DataContext)
    
    function handlePreviewClick(){
        navigate('/profile')
    }
    function handleShare(){
        setTimeout(()=>{
            setCopied(false)
        },2000)
        console.log(window.location.href)
        const profileUrl = `${window.location.href}/${profileDetails.documentId}`
        navigator.clipboard.writeText(profileUrl)
        setCopied(true)
    }
    return(
        <div className = "right-section-nav">
            <button onClick={handlePreviewClick} style={{display:currentPath==="/profile"?'none':'block'}} className="primary-btn">
                <img style={{display: isWideScreen>=768?'none':'block'}} className="preview-icon" src="./all_images/icon-preview-header.svg" />
                <h2 style={{display: isWideScreen>=768?'block':'none'}} className="nav-a-h2">Preview</h2>
            </button>
            <button onClick={handleShare} style={{display:currentPath==="/profile"?'block':'none'}} className="save-btn primary-btn share-btn">
                Share Link
            </button>

        </div>
    )
}
export default PreviewNav