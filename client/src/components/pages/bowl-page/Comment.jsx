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
      <div className="comment">
        <div className="comment-picture">
          <img src={comment.user.image}></img>
        </div>
        <div className="comment-content">
          <h3>{conditionalAttributes.title} rated this bowl {rating}/10</h3>
          <p>{content}</p>
          <p><em>{conditionalAttributes.possessive} favorite bowl is <strong>{user.fav_bowl}</strong></em></p>
          {(currentUserComment[0] && currentUserComment[0].id === comment.id) ? (
            <span>
              {(!showEditForm) ? (
                <button onClick={() => setShowEditForm(true)}>Edit My Comment</button>
              ) : (
                <button onClick={() => setShowEditForm(false)}>Hide Edit Form</button>
              )}
              <button onClick={deleteComment}>Delete My Comment</button>
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