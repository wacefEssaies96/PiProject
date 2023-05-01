import { deleteAllRates, deleteRate, postRate, updateRate } from '@/services/sportRates'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { FaStar } from "react-icons/fa"

export default function SportRating(props) {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [newRateId, setNewRateId] = useState(null)

    useEffect(() => {
        if (props.averagePerUser) {
            setRating(props.averagePerUser)
        }
    }, [])

    const handleClick = async (ratingValue) => {
        setRating(ratingValue)
        if (rating && props.userId && props.sportSubTypeTitle) {
            const data = await postRate(rating, props.userId, props.sportSubTypeTitle)
            setNewRateId(data.newRate._id)
            console.log(newRateId);
        }
    }

    const handleDelete = async (id) => {
        if (newRateId) {
            await deleteRate(id)
        }
    }

    const handleUpdate = async (id) => {
        if (newRateId) {
            await updateRate(rating, id, props.userId, props.sportSubTypeTitle)
        }
    }

    const deleteRates = async (id) => {
        if (props.userId && props.sportSubTypeTitle) {
            const del = await deleteAllRates(props.userId, props.sportSubTypeTitle)
            console.log(del);
        }
    }

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1
                return (
                    <label key={i}>
                        <input type='radio' name='rating' style={{ display: "none" }} value={ratingValue} onClick={() => handleClick(ratingValue)} />
                        <FaStar onMouseEnter={() => setHover(ratingValue)} onMouseLeave={() => setHover(null)} color={ratingValue <= (hover || rating) ? "#ffcc00" : "#e4e5e9"} key={i} size={props.size ? props.size : 23} style={{ cursor: "pointer", transition: "color 200ms" }} />
                    </label>
                )
            })}
            {!props.averagePerUser && rating && <p style={{ fontSize: "12px" }}>Your rate is {rating}</p>}
            {!rating && <p style={{ fontSize: "12px" }}>Not rated yet</p>}
            {props.averagePerUser && <p style={{ fontSize: "12px" }}>Your average rate is {rating}</p>}
            <div style={{ marginLeft: "-18%" }}>
                <Button className='btn wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button btn btn-primary' style={{ borderRadius: "8000px", margin: "15px" }} onClick={() => handleDelete(newRateId)}>Delete Rate</Button>
                <Button className='btn wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button btn btn-primary' style={{ borderRadius: "8000px", margin: "15px" }} onClick={() => handleUpdate(newRateId)}>Change Rate</Button>
                <Button className='btn wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button btn btn-primary' style={{ borderRadius: "8000px", margin: "15px" }} onClick={deleteRates}>Delete All Rates</Button>
            </div>
        </div>
    )
}
