import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"

import Comment from "./Comment"
import CommentForm from "./CommentForm"
import CommentEditForm from "./CommentEditForm"

import { GlobalContext } from "../../../App"


export default function CommentsSection({ bowlId }) {

  const { currentUser } = useContext(GlobalContext)

  console.log(currentUser)

  const [commentComponents, setCommentComponents] = useState([])
  const [isCurrentUserComment, setIsCurrentUserComment] = useState(false)
  useEffect(() => {
    fetch(`/api/comments_by_item/${bowlId}`)
    .then(r => r.json())
    .then(commentsData => {
      const currentUserComment = (currentUser) ? (commentsData.filter((comment) => {return comment.user_id === currentUser.id})) : ([])
      const otherUserComments = (currentUser) ? (commentsData.filter((comment) => {return comment.user_id !== currentUser.id})) : (commentsData)
      const allComments = [...currentUserComment, ...otherUserComments]

      setCommentComponents(
        allComments.map((comment) => {
          return <Comment key={comment.id} comment={comment} currentUserComment={currentUserComment} setIsCurrentUserComment={setIsCurrentUserComment} />
        })
      )
      setIsCurrentUserComment(Boolean(commentsData.find((comment) => {return comment.user_id === currentUser.id})))
      console.log("fetched")
    })
  }, [isCurrentUserComment])

  if (!commentComponents) return <h4>Loading...</h4>

  return (
    <div className="">
      <h3 className="mt-2 mb-4 text-xl font-bold">Ratings of this Bowl:</h3>
      {(!currentUser) ? (
        <h4>Please <Link to="/login">log in</Link> to rate this bowl.</h4>
      ) : (
        <CommentForm itemId={bowlId} isCurrentUserComment={isCurrentUserComment} setIsCurrentUserComment={setIsCurrentUserComment} />
      )}

      {commentComponents}
    </div>
  )
}