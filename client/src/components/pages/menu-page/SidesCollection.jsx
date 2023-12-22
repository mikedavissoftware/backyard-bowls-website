import {Link} from "react-router-dom"

import SideCard from "./SideCard"


export default function SidesCollection({ sidesDrinks, bowlNames }) {

  const sidesComponents = sidesDrinks.map(item => {
    return (
      // <div className="item" style={{width: "fit-content", padding: "15px"}}>
      //   <h2><Link to={`/items/${item.id}`}>{item.name}</Link></h2>
      //   <h3>${item.price}</h3>
      //   <img src={item.image} style={{height: "150px"}}></img>
      // </div>
      <SideCard item={item} bowlName={bowlNames[Math.floor(Math.random() * bowlNames.length)]} />
    )
  })


  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 mx-6 px-2 gap-12">
      {sidesComponents}
    </div>
  )
}