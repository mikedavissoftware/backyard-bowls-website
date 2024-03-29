import { useState, useContext } from "react"

import Comment from "./Comment"

import { GlobalContext } from "../../../App"


export default function CommentForm({ itemId, isCurrentUserComment, setIsCurrentUserComment }) {

  const { currentUser, setErrors, showErrors } = useContext(GlobalContext)

  const [showCommentForm, setShowCommentForm] = useState(false)

  function toggleCommentForm() {
    setShowCommentForm(!showCommentForm)
  }

  function numberOptions(max) {        
    const numbersArray = []
    for (let i=0; i<=max; i++) {
      numbersArray.push(
        <option value={i}>{i}</option>
      )
    }
    return numbersArray
  }

  const newForm = {
    rating: 10,
    content: "",
    user_id: currentUser.id,
    item_id: itemId
  }
  const [formData, setFormData] = useState(newForm)

  function handleChange(event) {
    console.log(event.target.value);
    setFormData({...formData, [event.target.name]: event.target.value})
    console.log(formData)
  }

  function submitComment(e) {
    e.preventDefault()

    fetch(`/api/comments`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    .then(r => {
      if (r.ok) {
        r.json().then(newComment => {
          console.log(newComment)
        })
        setIsCurrentUserComment(true)
        setFormData(newForm)
        toggleCommentForm()
      } else {
        r.json().then((err) => {
          setErrors(err.errors)
          console.log(err.errors)
        });
      }
    })
  }

  if (isCurrentUserComment) return null

  return (

    <div>
      {(!showCommentForm) ? (
        <button className="btn btn-primary mb-4" onClick={() => toggleCommentForm()}>Leave a Comment</button>
      ) : (
        <>
        <button className="btn btn-primary" onClick={() => toggleCommentForm()}>Hide Comment Form</button>
        <br/>
        {showErrors}

        <form className="mb-8" onSubmit={submitComment}>
          <div className="form-control max-w-2xl mx-auto">
            <label className="label">
              <span className="label-text mx-auto text-black dark:text-white">Rating:</span>
            </label>
            <select defaultValue="NA" className="select select-bordered w-full max-w-xs mx-auto text-lg" name="rating" onChange={(e) => {handleChange(e)}}>
              <option value="NA" disabled>How Delicious</option>
              {numberOptions(10)}
            </select>
          </div>

          <div className="form-control max-w-2xl mx-auto">
            <label className="label">
              <span className="label-text mx-auto text-black dark:text-white">Content:</span>
            </label>
            <textarea
              name="content"
              id="comment-box"
              value={formData.content}
              placeholder="Write your comment here..."
              onChange={(e) => {handleChange(e)}}
              className="textarea input-bordered w-full max-w-xs mx-auto text-white text-lg"
            />
          </div>
          <button className="btn btn-primary my-4" type="submit">Submit Your Comment</button>
        </form>
        </>
      )}
    </div>
  )
}