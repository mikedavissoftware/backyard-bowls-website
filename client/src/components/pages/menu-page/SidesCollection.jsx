import {Link} from "react-router-dom"


export default function SidesCollection({ sidesDrinks }) {

  const sidesComponents = sidesDrinks.map(item => {
    return (
      <div className="item" style={{width: "fit-content", padding: "15px"}}>
        <h2><Link to={`/items/${item.id}`}>{item.name}</Link></h2>
        <h3>${item.price}</h3>
        <img src={item.image} style={{height: "150px"}}></img>
      </div>
    )
  })


  return (
    <div className="items-container">
      {sidesComponents}
    </div>
  )
}