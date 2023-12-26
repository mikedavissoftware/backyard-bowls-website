import {Link} from "react-router-dom"

import SideCard from "./SideCard"


export default function SidesCollection({ sidesDrinks, bowlNames }) {

  const sidesComponents = sidesDrinks.map((item, index) => {
    return (
      <SideCard key={index + 1} item={item} bowlName={bowlNames[Math.floor(Math.random() * bowlNames.length)]} />
    )
  })


  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 mx-6 px-2 gap-12">
      {sidesComponents}
    </div>
  )
}