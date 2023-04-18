import MyVerticallyCenteredModal from '@/components/layouts/SportTypeModal'
import { useState } from 'react'
import { Button } from 'react-bootstrap'

const SportHomePage = ({ sportTypes }) => {

    const [listSportTypes, setListSportTypes] = useState(sportTypes)
    const [modalShow, setModalShow] = useState(false);
    // const [showMode, setShowMode] = useState('');

    const searchTitleDynamic = async (title) => {
        return await sportTypes.filter((x) => {
            let t = x.title.toLowerCase().includes(title.toLowerCase())
            if (t) {
                return x
            }
        })
    }

    const newList = async (e) => {
        return await searchTitleDynamic(e.target.value)
    }

    const handleChange = async (e) => {
        setListSportTypes(await newList(e))
    }

    const showModal = async (title) => {
        // setShowMode(title)
        setModalShow(true)
      }

    const hideModal=()=> {
        setModalShow(false)
    }

    return (
        <div className='container'>
            <h1>All Sports Types</h1>
            <div className='sidebar' style={{ width: "25%", marginLeft: "70%", marginTop: "3%" }}>
                <div id="search-1" className="widget widget_search">
                    <h4 className="widget-title">Search</h4>
                    <form className="relative" role="search">
                        <input onChange={handleChange} type="search" className="form-control" placeholder="Search by Title ..." required />
                        <button className="search_btn"><i className="fa fa-search"></i></button>
                    </form>
                </div>
            </div>
            {listSportTypes && listSportTypes.map(sportType => (
                <>
                    <Button className="btn btn-md wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button" variant="primary" onClick={showModal}>
                        {sportType.title}
                    </Button>
                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={hideModal}
                        title={sportType.title}
                    />
                </>
            ))}
        </div>
    );
}

export async function getServerSideProps(context) {
    const response = await fetch(`${process.env.backurl}/api/sportTypes/getAllSportTypes`)
    const data = await response.json()

    return {
        props: {
            sportTypes: data
        },
    }
}

export default SportHomePage;