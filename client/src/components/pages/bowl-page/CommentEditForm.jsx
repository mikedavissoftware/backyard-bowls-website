import { useState } from "react"

export default function CommentEditForm({ comment, setShowEditForm, setIsCurrentUserComment }) {

  function numberOptions(max) {        
    const numbersArray = []
    for (let i=0; i<=max; i++) {
      numbersArray.push(
        <option key={i} value={i}>{i}</option>
      )
    }
    return numbersArray
  }

  const [formData, setFormData] = useState({
    rating: comment.rating,
    content: comment.content
  })

  function handleChange(e) {
    console.log(e.target.value);
    setFormData({...formData, [e.target.name]: e.target.value})
    console.log(formData)
  }

  function submitEditComment(e) {
    e.preventDefault()

    console.log("submit button pushed")

    fetch(`/api/comments/${comment.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })

    setShowEditForm(false)
    setIsCurrentUserComment(false)
  }

  return (
    <div>
      <form className="mb-4" onSubmit={submitEditComment}>
        <div className="form-control max-w-2xl mx-auto mb-1">
          <label className="label">
            <span className="label-text mx-auto text-black">Rating:</span>
          </label>
          <select defaultValue={formData.rating} className="select select-bordered w-full max-w-xs mx-auto text-lg" name="rating" onChange={(e) => {handleChange(e)}}>
            {numberOptions(10)}
          </select>
        </div>

        <div className="form-control max-w-2xl mx-auto mb-2">
          <label className="label">
            <span className="label-text mx-auto text-black">Content:</span>
          </label>
          <textarea
            name="content"
            id="comment-box"
            value={formData.content}
            onChange={(e) => {handleChange(e)}}
            className="textarea input-bordered w-full max-w-xs mx-auto text-white text-lg"
          />
        </div>
        <button className="btn btn-primary my-4" type="submit">Submit Your Comment</button>
      </form>
    </div>
  )
}