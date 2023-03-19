import { fetchData } from "@/services/mix";
import { useEffect, useState, lazy, Suspense } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { confirmDelete } from "../../services/alerts";
import SpinnerLoading from "../layouts/SpinnerLoading";

const CategoriesAndSubCatForm = lazy(() => import('./CatAndSubCatForm'))

export default function CatAndSubCatList({ show, handleClose, mode }) {

    const [dataToEdit, setDataToEdit] = useState({})
    const [data, setData] = useState([])
    const [showForm, setshowForm] = useState(false)
    const [operationMode, setOperationMode] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleCloseForm = () => setshowForm(false);
    const handleshowForm = (data, opMode) => {
        if (mode === 'Category' && opMode === 'Create')
            data = { subcategory: [] }
        setOperationMode(opMode)
        setDataToEdit(data)
        setshowForm(true)
    }

    const refresh = async () => {
        setIsLoading(true)
        mode === "Category"
            ? setData(await fetchData(`${process.env.backurl}/api/admin/categories/find-all`))
            : setData(await fetchData(`${process.env.backurl}/api/admin/subcategories/find-all`))
        setIsLoading(false)
    }
    const deleteAll = () => {
        mode === "Category"
            ? confirmDelete(`${process.env.backurl}/api/admin/categories/delete-all`, refresh)
            : confirmDelete(`${process.env.backurl}/api/admin/subcategories/delete-all`, refresh)
    }
    useEffect(() => {
        refresh()
    }, [mode])


    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered size="xl">

            <Modal.Header closeButton>
                <Modal.Title>List of {mode}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button variant="outline-success" onClick={() => handleshowForm({}, 'Create')}>
                    Create new {mode}
                </Button>
                <Button variant="outline-warning" onClick={deleteAll}>
                    Delete All {mode}
                </Button>
                <Suspense fallback={<p>Loading...</p>}>
                    <CategoriesAndSubCatForm refresh={refresh} operation={operationMode} data={dataToEdit} show={showForm} handleClose={handleCloseForm} mode={mode}></CategoriesAndSubCatForm>
                </Suspense>
                {isLoading ? (<SpinnerLoading></SpinnerLoading>)
                    : (<Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Categories title</th>
                                {mode === 'Category' && <th>Sub Categories</th>}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 && data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td key={item.title}>{item.title}</td>
                                        {item.subcategory && <td key={index}>
                                            {item.subcategory.map((element, i) => {
                                                return (
                                                    <span key={i}>{element.title}, </span>
                                                )
                                            }
                                            )}
                                        </td>}
                                        <td key={item._id}>
                                            <Button variant="outline-secondary" onClick={() => handleshowForm(item, 'Edit')}>Edit</Button><i className="bi bi-pencil-square"></i>
                                            {item.subcategory
                                                ? (<Button onClick={() => { confirmDelete(`${process.env.backurl}/api/admin/categories/delete/${item._id}`, refresh) }} variant="outline-danger">Delete</Button>)
                                                : (<Button onClick={() => { confirmDelete(`${process.env.backurl}/api/admin/subcategories/delete/${item._id}`, refresh) }} variant="outline-danger">Delete</Button>
                                                )
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                            }

                        </tbody>
                    </Table>)
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}