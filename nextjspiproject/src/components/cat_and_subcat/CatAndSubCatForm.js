import { fetchData } from "@/services/mix";
import { submitCategory } from "@/services/category";
import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from 'react-select';
import SpinnerLoading from "../layouts/SpinnerLoading";
import { submitSubCategory } from "@/services/subcategory";

export default function CategoriesAndSubCatForm({ show, handleClose, data, operation, refresh, mode }) {

    const [subcategories, setSubCategories] = useState([])
    const [selected, setSelected] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getSubCategories = async () => {
        const options = await fetchData(`${process.env.backurl}/api/admin/subcategories/find-all`)
        setSubCategories(options.map((element) => {
            return { value: element.title, label: element.title }
        }))
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        if (data.subcategory) {
            const item = selected.map((element) => {
                return { title: element.value }
            })
            await submitCategory(event, item, operation);
        }else{
            await submitSubCategory(event, operation);
        }
        setIsLoading(false)
        refresh()
        handleClose()
    }
    useEffect(() => {
        if (data.subcategory)
            getSubCategories()
    }, [show])

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered >
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{operation} {mode}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <input type="hidden" name="id" defaultValue={data._id}></input>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            name="category"
                            type="text"
                            placeholder={mode}
                            autoFocus
                            defaultValue={data.title}
                        />
                    </Form.Group>
                    {data.subcategory &&
                        <Form.Group className="mb-3">
                            <Form.Label>Sub categories</Form.Label>
                            <Select
                                isMulti
                                name="subcategories"
                                options={subcategories}
                                defaultValue={() => {
                                    return data.subcategory.map((element) => {
                                        return { value: element.title, label: element.title }
                                    })
                                }}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={(data) => setSelected(data)}
                            />
                        </Form.Group>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {isLoading &&
                        <SpinnerLoading></SpinnerLoading>
                    }
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" type="submit">Save Changes</Button>
                </Modal.Footer>
            </Form>
        </Modal >
    )
}