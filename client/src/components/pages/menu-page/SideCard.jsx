import { useState, useContext } from "react"

import { GlobalContext } from "../../../App"


export default function SideCard({ item, bowlName }) {

  const { currentUser, history, setErrors } = useContext(GlobalContext)

  const { name, image } = item

  const [likes, setLikes] = useState(item.likes)

  const isLikedByCurrentUser = (currentUser) ? (
    item.likes.map(((like) => {return like.user_id})).includes(currentUser.id)
  ) : (
    false
  )
  const [showLikeButton, setShowLikeButton] = useState(isLikedByCurrentUser)

  const [itemLikes, setItemLikes] = useState(item.likes)

  const redirect = () => {
    setErrors(["Please login to like & rate bowls."])
    history.push("/login")
  }

  function createLike() {
    fetch(`/api/likes`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({user_id: currentUser.id, item_id: item.id})
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
      <figure className=" max-h-96"><img src={(image) ? (image) : (Placeholder)} className=""/></figure>
      <div className="card-body">
        <h2 className="card-title justify-center font-bold">{name}</h2>
        <p>Pairs great with {bowlName}!</p>
        <div className="card-actions justify-end">
          {
            showLikeButton ? 
            (
              <button className="btn btn-primary" onClick={() => {deleteLike()}}>🧡</button>
            ) : 
            (
              <button className="btn btn-primary border-2 border-primary" onClick={() => {(currentUser) ? (createLike()) : (redirect())}}>♡ Click to Like</button>
            )
          }
        </div>
      </div>
    </div>
  )
}