import { useState } from "react"
import { useContext } from "react"
import DataContext from "../context/context"
function Dropdown({id,index}){
    
    const socials = [
        {
            img:'./all_images/icon-github-gray.svg',
            name: 'Github',
            alt:'Github Icon'
        },
        {
            img:'./all_images/icon-frontend-mentor-gray.svg',
            name: 'frontend Mentor',
            alt:'Frontend Mentor Icon'
        },
        {
            img:'./all_images/icon-Twitter-gray.svg',
            name: 'Twitter',
            alt:'Twitter Icon'
        },
        {
            img:'./all_images/icon-linkedin-gray.svg',
            name: 'LinkedIn',
            alt:'LinkedIn Icon'
        },
        {
            img:'./all_images/icon-youtube-gray.svg',
            name: 'YouTube',
            alt:'YouTube Icon'
        },
        {
            img:'./all_images/icon-facebook-gray.svg',
            name: 'Facebook',
            alt:'Facebook Icon'
        },
        {
            img:'./all_images/icon-twitch-gray.svg',
            name: 'Twitch',
            alt:'Twitch Icon'
        },
        {
            img:'./all_images/icon-devto-gray.svg',
            name: 'Dev.to',
            alt:'Dev.to Icon'
        },
        {
            img:'./all_images/icon-codewars-gray.svg',
            name: 'Codewars',
            alt:'Codewars Icon'
        },
        {
            img:'./all_images/icon-codepen-gray.svg',
            name: 'Codepen',
            alt:'Codepen Icon'
        },
        {
            img:'./all_images/icon-freecodecamp-gray.svg',
            name: 'freeCodeCamp',
            alt:'freeCodeCamp Icon'
        },
        {
            img:'./all_images/icon-gitlab-gray.svg',
            name: 'Gitlab',
            alt:'Gitlab Icon'
        },
        {
            img:'./all_images/icon-hashnode-gray.svg',
            name: 'Hashnode',
            alt:'Hashnode Icon'
        },
        {
            img:'./all_images/icon-stack-overflow-gray.svg',
            name: 'Stack Overflow',
            alt:'Stack Overflow Icon'
        },
     
    ]
    const { setSelectedLinks,selectedLinks} = useContext(DataContext)
    const [dropDownOpen, setDropDownOpen] = useState(false)

    function handleSelect(image, name,id){
        const updatedLinkDivs = selectedLinks.map((selectedLink)=>{
            if(selectedLink.id===id){
                let updatedLinkDiv = {...selectedLink,selected_image:image,selected_social:name}
                return updatedLinkDiv
            }
            return selectedLink
        })
        setSelectedLinks(updatedLinkDivs)
        setDropDownOpen(false)
    }

    function handleDropdown(){
        dropDownOpen?setDropDownOpen(false):setDropDownOpen(true)
    }
    return(
        
        <fieldset>
            <h3 className="link-input-heading">Platform</h3>
            <div className="platform-div">
            <div className="selector">
                <div onClick={handleDropdown} className="selectField">
                    <div className="social-intro-div">
                        
                    <img src={selectedLinks.length && selectedLinks[index].selected_image} />
                    <p>{selectedLinks.length && selectedLinks[index].selected_social}</p>
                    </div> 
                    <img style={{rotate:dropDownOpen?'180deg':'0deg'}} src="./all_images/icon-chevron-down.svg" />
                </div>
                <ul style={{display:dropDownOpen?'block':'none'}} className="select">
                    {
                        socials.map((social,index)=>{
                        return  <li key={index} onClick={()=>handleSelect(social.img, social.name,id)} className="options social-intro-div">
                                    <img src={social.img}/>
                                    <p className="social-name-link-box">{social.name}</p>
                                </li>
                        })
                    }
                </ul>
            </div>
        </div>
        </fieldset>
    
    )
}
export default Dropdown