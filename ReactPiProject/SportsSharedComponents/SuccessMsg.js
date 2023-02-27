import { BiCheck } from "react-icons/bi"

export default function Success({message}) {
    return (
    <div className="alert alert-success d-flex align-items-center" role="alert">
        <div>
            {message} <BiCheck size={25}></BiCheck>
        </div>
    </div>
    )
}