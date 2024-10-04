import { useContext } from "react";
import DataContext from "../context/context";
import { useNavigate } from "react-router-dom";
function MainNav() {
  const { currentPath } = useContext(DataContext);
  const navigate = useNavigate();
  function handleToLink() {
    navigate("/");
  }
  function handleProfileClick() {
    navigate("/profileEdit");
  }

  return (
    <div className="center-section-nav">
      <ul
        style={{ display: currentPath === "/profile" ? "none" : "flex" }}
        className="nav-ul"
      >
        <li
          onClick={handleToLink}
          className={currentPath === "/" ? "nav-li nav-li-active" : "nav-li"}
        >
          <a className="nav-a">
            
            <img className="link-icon" src="/all_images/icon-link.svg" />
             <h2 className="nav-a-h2">Links</h2>
          </a>
        </li>
        <li
          onClick={handleProfileClick}
          className={
            currentPath === "/profileEdit" ? "nav-li nav-li-active" : "nav-li"
          }
        >
          <a className="nav-a">
            <img
              className="profile-icon"
              src="/all_images/icon-profile-details-header.svg"
            />
            <h2 className="nav-a-h2">Profile Details</h2>
            
          </a>
        </li>
      </ul>
      <button
        onClick={handleToLink}
        style={{ display: currentPath === "/profile" ? "block" : "none" }}
        className="primary-btn "
      >
        Back to Editor
      </button>
    </div>
  );
}
export default MainNav;
