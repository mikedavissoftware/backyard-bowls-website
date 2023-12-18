import { useState, useEffect } from "react"

import BowlCollection from "./menu-page/BowlCollection"
import SidesCollection from "./menu-page/SidesCollection"


export default function MenuPage() {

  const [allLikes, setAllLikes] = useState([])
  useEffect(() => {
    fetch(`/api/likes`)
    .then(r => r.json())
    .then(likesData => {
      setAllLikes(likesData)
    })
  }, [])
  
  const [items, setItems] = useState([])
  useEffect(() => {
    fetch(`/api/items`)
    .then(r => r.json())
    .then(itemsData => {
      console.log(itemsData)
      setItems(itemsData)
    })
  }, [allLikes])

  const bowls = items.filter(item => {
    return item.category === "Bowl"
  })
  const sides = items.filter(item => {
    return item.category === "Side"
  })
  const drinks = items.filter(item => {
    return item.category === "Drink"
  })
  const sidesDrinks = [...sides, ...drinks]

  if (!items) return <h2>Loading...</h2>

  return (
    <div className="menu-container">
      <h1>🥗 BOWLS 🥗</h1>
      <BowlCollection bowls={bowls} allLikes={allLikes} setAllLikes={setAllLikes} />
      <hr width="50%"></hr>
      <h1>🍠 SIDES & DRINKS 🍹</h1>
      <SidesCollection sidesDrinks={sidesDrinks} />
    </div>
  )
}