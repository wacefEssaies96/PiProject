import { BiCheck } from "react-icons/bi"

export default function Bug({message}) {
    return (
    <div className="alert alert-danger d-flex align-items-center" role="alert">
        <div>
            {message} <BiCheck size={25}></BiCheck>
        </div>
    </div>
    )
}