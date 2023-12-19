import { NavLink } from "react-router-dom"



export default function NavBarRegular({ currentUser, handleLogoutClick }) {



  return (
    <div className="invisible h-0 md:visible md:h-auto py-4">
      <ul className="menu menu-horizontal bg-base-100 rounded-xl">
        <li><NavLink exact to="/">Home</NavLink></li>
        <li><NavLink to="/menu">Menu</NavLink></li>
        {currentUser ? (
          <>
            <li><NavLink to="/me">My Account</NavLink></li>
            <li><NavLink to="/logout" onClick={handleLogoutClick}>Log Out</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/login">Log In</NavLink></li>
          </>
        )}
      </ul>
    </div>
  )
}