import { fetchData } from "@/services/mix";
import { useEffect, useState, lazy, Suspense } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { confirmDelete } from "./Alerts";
import SpinnerLoading from "./SpinnerLoading";
const CategoriesAndSubCategories = lazy(() => import('@/components/article/CategoriesAndSubCategories'))

export default function Categories({ show, handleClose }) {

    const [categoryToEdit, setCategoryToEdit] = useState({})
    const [categories, setCategories] = useState([])
    const [showEditCat, setShowEditCat] = useState(false);
    const handleCloseEditCat = () => setShowEditCat(false);
    const handleShowEditCat = (data) => {
        setCategoryToEdit(data)
        setShowEditCat(true)
    }

    const refresh = async () => {
        setCategories(await fetchData(`${process.env.backurl}/api/admin/categories/find-all`))
    }
    useEffect(() => {
        refresh()
    }, [show])

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered size="xl">
            <Modal.Header closeButton>
                <Modal.Title>List of categories</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Suspense fallback={<SpinnerLoading></SpinnerLoading>}>
                    <CategoriesAndSubCategories refresh={refresh} operation={'Edit'} category={categoryToEdit} show={showEditCat} handleClose={handleCloseEditCat}></CategoriesAndSubCategories>
                </Suspense>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Categories title</th>
                            <th>Sub Categories</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td key={item.title}>{item.title}</td>
                                    <td key={index}>
                                        {item.subcategory.map((element, i) => {
                                            return (
                                                <span key={i}>{element.title}, </span>
                                            )
                                        }
                                        )}
                                    </td>
                                    <td key={item._id}>
                                        <Button variant="outline-secondary" onClick={() => handleShowEditCat(item)}>Edit</Button><i class="bi bi-pencil-square"></i>
                                        <Button onClick={() => { confirmDelete(`${process.env.backurl}/api/admin/categories/delete/${item._id}`, refresh) }} variant="outline-danger">Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal >
    )
}