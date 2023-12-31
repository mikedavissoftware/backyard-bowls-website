import { useContext } from "react"

import HeaderLogo from "../assets/images/wordmark-green.png"

import NavBarRegular from "./NavBarRegular"
import NavBarCollapse from "./NavBarCollapse"

import { GlobalContext } from "../App"


export default function Header() {

  const { currentUser, setCurrentUser } = useContext(GlobalContext)

  function handleLogoutClick() {
    fetch("/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setCurrentUser(null);
      }
    });
  }

  return (
    <header id="header" className="bg-banner bg-center bg-cover bg-white-50 bg-opacity-50">
      <div className="bg-slate-800 bg-opacity-80 p-3">
        <img src={HeaderLogo} alt="Backyard Bowls Logo" className="drop-shadow-dark stroke-black p-3 mx-auto" style={{width: "95%", marginBottom: "20px", maxWidth: "600px"}}/>
        <NavBarRegular currentUser={currentUser} handleLogoutClick={handleLogoutClick} location={"header"} />
        <NavBarCollapse currentUser={currentUser} handleLogoutClick={handleLogoutClick} />
      </div>
    </header>
  )
}