import { useState, useContext } from "react"
import { Link } from "react-router-dom"

import { GlobalContext } from "../../../App"

import Placeholder from "../../../assets/bowl-placeholder-2.png"


export default function BowlCard({ bowl }) {

  const { currentUser, history, setErrors } = useContext(GlobalContext)

  const { id, name, category, image, base, protein, veggies, dressing, price, comments } = bowl

  const [likes, setLikes] = useState(bowl.likes)

  const isLikedByCurrentUser = (currentUser) ? (
    bowl.likes.map(((like) => {return like.user_id})).includes(currentUser.id)
  ) : (
    false
  )
  const [showLikeButton, setShowLikeButton] = useState(isLikedByCurrentUser)

  const [itemLikes, setItemLikes] = useState(bowl.likes)

  const vegArray = JSON.parse(bowl.veggies)
  const vegComponents = vegArray.map((veggie, index) => {
    return <li key={index + 1}>{veggie}</li>
  })
  function vegString(veggiesArray) {
    let string = ""
    veggiesArray.forEach((veggie, index) => {
      string += veggie
      if (index < (veggiesArray.length - 1)) {
        string += ", "
      }
    })
    return string
  }
  

  const redirect = () => {
    setErrors(["Please login to like & rate bowls."])
    history.push("/login")
  }
    
  const redirectBowlPage = () => {
    history.push(`/items/${id}`)
  }

  function createLike() {
    fetch(`/api/likes`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({user_id: currentUser.id, item_id: bowl.id})
    })
    .then(r => r.json())
    .then(newLike => {
      setLikes([...likes, newLike])
      setItemLikes([...itemLikes, newLike])
    })
    setShowLikeButton(!showLikeButton)
  }

  function deleteLike() {
    const userLike = itemLikes.find((itemLike) => {
      return itemLike.user_id === currentUser.id
    })
    fetch(`/api/likes/${userLike.id}`, {
      method: "DELETE"
    })
    setLikes(likes.filter((like) => {
      return like.id !== userLike.id
    }))
    setItemLikes(itemLikes.filter((like) => {
      return like.id !== userLike.id
    }))
    setShowLikeButton(!showLikeButton)
  }

  return (
    <div className="card bg-base-100 shadow-xl image-full m-2">
      <figure className=""><img src={(image) ? (image) : (Placeholder)} className=""/></figure>
      <div className="card-body drop-shadow-dark1">
        <h2 className="card-title justify-center font-bold">{name}</h2>
        <p>Our <strong>{name}</strong> has our classic <strong>{base}</strong> base with <strong>{protein}</strong> as its protein, and rounding out the ingredients with: <strong>{vegString(vegArray)}</strong>. Last, but not least, this delicious bowl is finished with a dressing of <strong>{dressing}</strong>. Bon appétit!</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={redirectBowlPage}>More Details</button>
          {
            showLikeButton ? 
            (
              <button className="btn btn-secondary" onClick={() => {deleteLike()}}>🧡</button>
            ) : 
            (
              <button className="btn btn-primary" onClick={() => {(currentUser) ? (createLike()) : (redirect())}}>♡</button>
            )
          }
        </div>
      </div>
    </div>
  )
}