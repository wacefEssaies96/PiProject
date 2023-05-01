import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa"

export default function SportRating(props) {
  const [rating, setRating] = useState(null)
  const [hover, setHover] = useState(null)

  useEffect(() => {
    setRating(props.sportSubType.averageRating)
  }, [])

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1
        return (
          <label>
            <FaStar color={ratingValue <= (hover || rating) ? "#ffcc00" : "#e4e5e9"} key={i} size={23} />
          </label>
        )
      })}
      {rating ?
        <p style={{ fontSize: "12px" }}>The average rating is {rating}</p> :
        <p style={{ fontSize: "12px" }}>Not rated yet</p>
      }
    </div>
  )
}
