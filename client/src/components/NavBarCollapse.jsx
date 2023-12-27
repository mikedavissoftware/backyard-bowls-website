import { NavLink } from "react-router-dom"


export default function NavBarCollapse({ currentUser, handleLogoutClick, location }) {

  function collapseNav() {
    document.getElementById(`navbar-${location}`).checked = false
  }

  function logoutFunctions() {
    collapseNav();
    handleLogoutClick();
    console.log("function called")
  }

  return (
    <div className="collapse md:hidden my-1">
      <input id={`navbar-${location}`} className="nav-bar-checkbox" type="checkbox"/>
      <div className="collapse-title bg-base-100 rounded-lg px-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-full h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </div>
      <div className="collapse-content">
        <ul className="menu bg-base-100 rounded-b-xl">
          <li><NavLink exact to="/" className="block" onClick={collapseNav}>Home</NavLink></li>
          <li><NavLink to="/menu" className="block" onClick={collapseNav}>Menu</NavLink></li>
          {currentUser ? (
            <>
              <li><NavLink to="/me" className="block" onClick={collapseNav}>My Account</NavLink></li>
              <li><NavLink to="/logout" onClick={logoutFunctions} className="block">Log Out</NavLink></li>
            </>
          ) : (
            <>
              <li><NavLink to="/login" className="block" onClick={collapseNav}>Log In</NavLink></li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}