import { useState, useContext } from "react"

import CommentEditForm from "./CommentEditForm"

import { GlobalContext } from "../../../App"


export default function Comment({ comment, currentUserComment, setIsCurrentUserComment }) {

  const { currentUser } = useContext(GlobalContext)

  const [showEditForm, setShowEditForm] = useState(false)

  const {content, rating, user} = comment

  let conditionalAttributes = {
    title: "",
    possessive: ""
  }

  console.log(currentUser)

  if (currentUserComment[0] && comment.user_id === currentUserComment[0].user_id) {
    conditionalAttributes.title = "You"
    conditionalAttributes.possessive = "Your"
  } else {
    conditionalAttributes.title = comment.user.username
    conditionalAttributes.possessive = `${comment.user.username}'s`
  }

  console.log(conditionalAttributes)

  function deleteComment() {
    // e.preventDefault()

    fetch(`/api/comments/${comment.id}`, {
      method: "DELETE",
    })
    setIsCurrentUserComment(false)
  }

  if (!comment) return <h3>Loading...</h3>

  return (
    <div>
      <div className="flex bg-slate-300 rounded-2xl overflow-hidden my-4">
        <div>
          <img src={comment.user.image} className="h-48"></img>
        </div>
        <div className="py-2 px-3 text-black text-left">
          <h3><span className="font-bold">{conditionalAttributes.title} <span className="italic">(favorite: {user.fav_bowl})</span></span></h3>
          <p>Rating: <span className="font-bold">{rating}/10</span></p>
          <p className="italic">"{content}"</p>
          {(currentUserComment[0] && currentUserComment[0].id === comment.id) ? (
            <span>
              {(!showEditForm) ? (
                <button className="btn btn-secondary inline m-2" onClick={() => setShowEditForm(true)}>Edit My Comment</button>
              ) : (
                <button className="btn btn-secondary inline m-2" onClick={() => setShowEditForm(false)}>Hide Edit Form</button>
              )}
              <button className="btn btn-secondary inline m-2" onClick={deleteComment}>Delete My Comment</button>
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
      {(showEditForm) ? (
        <CommentEditForm comment={comment} setShowEditForm={setShowEditForm} setIsCurrentUserComment={setIsCurrentUserComment} />
      ) : (
        <></>
      )}
    </div>
  )
}