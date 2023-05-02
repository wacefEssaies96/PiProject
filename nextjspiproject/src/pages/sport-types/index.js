import { useEffect, useState } from 'react'
import { Button, Tab, Nav, Col, Row } from 'react-bootstrap'

const SportHomePage = ({ sportTypes }) => {

    const [listSportTypes, setListSportTypes] = useState(sportTypes)
    const [sportTypeByTitle, setSportTypeByTitle] = useState({
        title: '',
        advantages: [],
        sportSubType: []
    })
    const [change, setChange] = useState(false)
    const [arr1, setArr1] = useState([])
    const [arr2, setArr2] = useState([])

    const handleChangeSportType = () => {
        setChange(prev => prev ? false : true)
    }

    useEffect(() => {
        let index = 0
        const loadDetails = async () => {
            if (!change) {
                const response2 = await fetch(`${process.env.backurl}/api/sportTypes/searchTypeByTitle/${listSportTypes[index].title}`)
                const data2 = await response2.json()
                setSportTypeByTitle(data2)
                let t1 = sportTypeByTitle.advantages != [] && sportTypeByTitle.advantages.slice(0, sportTypeByTitle.advantages.length / 2)
                setArr1(t1)
                let t2 = sportTypeByTitle.advantages != [] && sportTypeByTitle.advantages.slice(sportTypeByTitle.advantages.length / 2)
                setArr2(t2)
            } else {
                index++
                const response2 = await fetch(`${process.env.backurl}/api/sportTypes/searchTypeByTitle/${listSportTypes[index].title}`)
                const data2 = await response2.json()
                setSportTypeByTitle(data2)
                let t1 = sportTypeByTitle.advantages != [] && sportTypeByTitle.advantages.slice(0, sportTypeByTitle.advantages.length / 2)
                setArr1(t1)
                let t2 = sportTypeByTitle.advantages != [] && sportTypeByTitle.advantages.slice(sportTypeByTitle.advantages.length / 2)
                setArr2(t2)
            }
        }
        loadDetails()
    }, [change])

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

    return (
        <div className='container' style={{ paddingBottom: "5%" }}>
            <div className="d-flex justify-content-center" style={{ paddingTop: "5%" }}>
                <div className="wd-service-heading wd-section-heading">
                    <span className="heading-subtitle">Health SpotLight !</span>
                    <h3 className="wow fadeIn">All Sport Types</h3>
                </div>
            </div>
            <div className='sidebar' style={{ width: "25%", marginLeft: "70%", marginTop: "3%", marginBottom:"3%" }}>
                <div id="search-1" className="widget widget_search">
                    <h4 className="widget-title">Search</h4>
                    <form className="relative" role="search">
                        <input onChange={handleChange} type="search" className="form-control" placeholder="Search by Title ..." required />
                        <button className="search_btn"><i className="fa fa-search"></i></button>
                    </form>
                </div>
            </div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            {listSportTypes && listSportTypes.map(sportType =>
                                <Nav.Item>
                                    <Button onClick={handleChangeSportType} style={{background:"#d93", borderColor:"#d93", marginBottom:"10px"}}><Nav.Link style={{background:"#d93", borderColor:"#d93"}} eventKey="first">{sportType.title}</Nav.Link></Button>
                                </Nav.Item>
                            )}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                {arr1 && arr1.map((a, i) =>
                                    <div key={i} className='d-flex flex-column'>
                                        <h4>{arr1[i]}</h4>
                                        <p>{arr2[i]}</p>
                                    </div>
                                )}
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
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