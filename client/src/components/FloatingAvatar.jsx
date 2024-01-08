import { NavLink } from "react-router-dom/cjs/react-router-dom.min"



export default function FloatingAvatar({ currentUser }) {



  return (
    <div className="fixed right-0 top-0 z-20">
      <div className="avatar online m-3 md:m-4 drop-shadow-dark3">
        <div className="w-10 rounded-full object-right border-2 bg-white">
          <NavLink to="/me">
            <img className="hover:opacity-80 duration-200" src={currentUser.image} />
          </NavLink>
        </div>
      </div> 
    </div>
  )
}