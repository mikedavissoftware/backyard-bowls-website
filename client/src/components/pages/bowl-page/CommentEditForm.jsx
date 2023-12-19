import { useState } from "react"

export default function CommentEditForm({ comment, setShowEditForm, setIsCurrentUserComment }) {

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
    rating: 0,
    content: ""
  }
  const [formData, setFormData] = useState(newForm)

  function handleChange(event) {
    console.log(event.target.value);
    setFormData({...formData, [event.target.name]: event.target.value})
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

    setFormData(newForm)
    setShowEditForm(false)
    setIsCurrentUserComment(false)
  }

  return (
    <div>
      <form onSubmit={submitEditComment}>
        <label><strong>Rating: </strong></label>
        <br></br>
        <select name="rating" onChange={(e) => {handleChange(e)}}>
          {numberOptions(10)}
        </select>
        <br></br>

        <label><strong>Content: </strong></label>
        <br></br>
        <textarea
          name="content"
          id="comment-box"
          rows="5"
          cols="50"
          value={formData.content}
          placeholder={`Change from "${comment.content}"`}
          onChange={(e) => {handleChange(e)}}
        ></textarea>

        <br></br>
        <button type="submit">Submit Your Edits</button>
      </form>
    </div>
  )
}