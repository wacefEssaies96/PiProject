import { Button } from "react-bootstrap";
import { confirmDeleteOneArticle } from "./Alerts";

export default function DeleteArticle(props) {
    const deleteOneArticle = async () => {
       confirmDeleteOneArticle(props)
    }

    return (
        <>
            <Button onClick={deleteOneArticle} variant="outline-danger">Delete</Button>
        </>
    )
}

