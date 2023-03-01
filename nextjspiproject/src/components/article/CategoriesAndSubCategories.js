import { fetchData } from "@/services/mix";
import { submitCategory } from "@/services/category";
import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from 'react-select';
import SpinnerLoading from "./SpinnerLoading";

export default function CategoriesAndSubCategories({ show, handleClose, category, operation , refresh}) {

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
        setIsLoading(true)
        event.preventDefault();
        const data = selected.map((element) => {
            return { title: element.value }
        })
        await submitCategory(event, data, operation);
        setIsLoading(false)
        refresh()
        handleClose()
    }
    useEffect(() => {
        getSubCategories()
    }, [])

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered >
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{operation} category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <input type="hidden" name="id" defaultValue={category._id}></input>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            name="category"
                            type="text"
                            placeholder="Category"
                            autoFocus
                            defaultValue={category.title}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Sub categories</Form.Label>
                        <Select
                            isMulti
                            name="subcategories"
                            options={subcategories}
                            defaultValue={() => {
                                return category.subcategory.map((element) => {
                                    return { value: element.title, label: element.title }
                                })
                            }}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={(data) => setSelected(data)}
                        />
                    </Form.Group>
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