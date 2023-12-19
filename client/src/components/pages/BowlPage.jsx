import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import CommentSection from "./bowl-page/CommentSection"
import BowlDetail from "./bowl-page/BowlDetail"


export default function BowlPage() {

  const { id } = useParams()

  const [bowl, setBowl] = useState(null)
  useEffect(() => {
    fetch(`/api/items/${id}`)
    .then(r => r.json())
    .then(itemData => {
      setBowl(itemData)
    })
  }, [])

  if (!bowl) return <h2>Loading...</h2>

  return (
    <>
    <BowlDetail bowl={bowl} />
    <CommentSection bowlId={id} />
    </>
  )
}