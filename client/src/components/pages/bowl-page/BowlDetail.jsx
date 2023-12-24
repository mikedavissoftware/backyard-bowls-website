import { useState, useContext } from "react"
import { Link } from "react-router-dom"

import { GlobalContext } from "../../../App"

import Placeholder from "../../../assets/bowl-placeholder-2.png"


export default function BowlDetail({ bowl }) {

  const { currentUser, history, setErrors } = useContext(GlobalContext)

  const [likes, setLikes] = useState(bowl.likes)

  const isLikedByCurrentUser = (currentUser) ? (
    bowl.likes.map(((like) => {return like.user_id})).includes(currentUser.id)
  ) : (
    null
  )
  const [showAsLiked, setShowAsLiked] = useState(Boolean(isLikedByCurrentUser))

  const [itemLikes, setItemLikes] = useState(bowl.likes)
  
  const vegList = bowl.veggies.slice(1, bowl.veggies.length-1)
  const vegArray = vegList.split(", ")
  const vegComponents = vegArray.map((veggie) => {
    return <li>{veggie.slice(1, veggie.length-1)}</li>
  })

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
      body: JSON.stringify({user_id: currentUser.id, item_id: bowl.id})
    })
    .then(r => r.json())
    .then(newLike => {
      setLikes([...likes, newLike])
      setItemLikes([...itemLikes, newLike])
    })
    setShowAsLiked(!showAsLiked)
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
    setShowAsLiked(!showAsLiked)
  }

  return (
    <div className="mb-4">
      <h1 className="mb-6 text-3xl font-bold">{bowl.name}</h1>
      <img src={bowl.image} className="w-96 rounded-2xl my-4"></img>
      <div>
        {
          showAsLiked ? 
          (
            <button className="btn btn-primary" onClick={() => {deleteLike()}}>🧡</button>
          ) : 
          (
            <button className="btn btn-primary border-2 border-primary" onClick={() => {(currentUser) ? (createLike()) : (redirect())}}>♡</button>
          )
        }
      </div>
      <span className="font-bold block my-2">{itemLikes.length} Users Like this Bowl</span>

      <hr className="w-1/2 mx-auto my-4"/>

      <h3 className="mt-2 mb-4 text-xl font-bold">Ingredients:</h3>
      <div className="text-slate-600 bg-slate-300 px-4 py-2 rounded-md w-fit mx-auto my-7">
        <span className="block my-2 p-1 bg-slate-400 rounded-md"><strong>Base: </strong>{bowl.base}</span>
        <span className="block my-2 p-1 bg-slate-400 rounded-md"><strong>Protein: </strong>{bowl.protein}</span>
        <div className="my-2 p-1 bg-slate-400 rounded-md">
          <span className="block"><strong>Veggies: </strong></span>
          <ul>
            {vegComponents}
          </ul>
        </div>
        <span className="block my-2 p-1 bg-slate-400 rounded-md"><strong>Dressing: </strong>{bowl.dressing}</span>
      </div>
    </div>
  )
}