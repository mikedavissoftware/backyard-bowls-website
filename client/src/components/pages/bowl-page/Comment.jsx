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
    <div className="bg-slate-300 rounded-2xl overflow-hidden my-4">
      <div className="block md:flex">
        <div className="mt-4 mb-2 md:my-0">
          <img src={comment.user.image} className={`h-52 rounded-xl ${(showEditForm) ? ("md:rounded-br-2xl md:rounded-tr-none md:rounded-tl-none md:rounded-bl-none") : ("md:rounded-none")}`}></img>
        </div>
        <div className="py-2 px-3 text-black text-center md:text-left">
          <h3 className="md:text-left"><span className="font-bold">{conditionalAttributes.title} </span><span className="italic">(favorite: {user.fav_bowl})</span></h3>
          <p>Rating: <span className="font-bold">{rating}/10</span></p>
          <p className="italic my-4">"{content}"</p>
          {(currentUserComment[0] && currentUserComment[0].id === comment.id) ? (
            <span>
              {(!showEditForm) ? (
                <button className="btn btn-secondary inline m-2" onClick={() => setShowEditForm(true)}>Edit My Comment</button>
              ) : (
                <button className="btn btn-secondary inline m-2" onClick={() => setShowEditForm(false)}>Cancel My Edits</button>
              )}

              <button className="inline-block mx-1 my-4 btn btn-warning" onClick={()=>document.getElementById('delete_comment_modal').showModal()}>Delete My Comment</button>
              <dialog id="delete_comment_modal" className="modal">
                <div className="modal-box py-8">
                  <div className="text-white text-center">
                    <h3 className="font-bold text-lg">Just checking...</h3>
                    <p className="py-4">Are you sure you want to delete your comment?</p>
                  </div>
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn btn-primary mx-1">Cancel</button>
                      <button className="btn btn-warning mx-1" onClick={deleteComment}>I'm Sure!</button>
                    </form>
                  </div>
                </div>
              </dialog>
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