import { useState, useEffect } from "react"

import BowlCard from "./BowlCard"


export default function BowlsCollection({ bowls }) {

  const [allLikes, setAllLikes] = useState([])
  useEffect(() => {
    fetch(`/api/likes`)
    .then(r => r.json())
    .then(likesData => {
      setAllLikes(likesData)
    })
  }, [])

  const bowlCards = bowls.map(bowl => {
    // console.log(bowl.id)
    return <BowlCard key={bowl.id} bowl={bowl} allLikes={allLikes} setAllLikes={setAllLikes} />
  })

  if (!bowls) return <span className="loading loading-bars loading-lg"></span>

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 mx-6 px-2 gap-12">
      {bowlCards}
    </div>
  )
}