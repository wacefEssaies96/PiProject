import CardSportType from '@/components/sport_types/CardSportType';
import Link from 'next/link'
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const SportSubTypesPage = ({ sportSubTypes }) => {
    const [listSportSubTypes, setListSportSubTypes] = useState(sportSubTypes)
    const [sportSubTypesScraped, setSportSubTypesScraped] = useState({})
    const [showMore, setShowMore] = useState(false);
    const [text, setText] = useState('')

    const toggleShowMore = (sT) => {
        setShowMore(!showMore);
        if (sT.definitionHistory.length > 100)
            setText(sT.definitionHistory)
    };

    const searchTitleDynamic = async (title) => {
        return await sportSubTypes.filter((x) => {
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
        setListSportSubTypes(await newList(e))
    }

    const webScrapingSubTypes = async () => {
        const res = await fetch(`${process.env.backurl}/api/sportSubTypes/sportSubTypesTitle`)
        await res.json()
            .then(sub => setSportSubTypesScraped(sub))
    }

    const filterIndividualSubTypes = async () => {
        await webScrapingSubTypes()
        let table = []
        if (sportSubTypesScraped.sportSubTypes1) {
            for (let i = 0; i < sportSubTypesScraped.sportSubTypes1.length; i++) {
                for (let j = 0; j < listSportSubTypes.length; j++) {
                    if (sportSubTypesScraped.sportSubTypes1[i] === listSportSubTypes[j].title) {
                        table.push(listSportSubTypes[j])
                    }
                }
            }
            setListSportSubTypes(table)
        }
    }

    const filterPartnerSubTypes = async () => {
        await webScrapingSubTypes()
        let table = []
        if (sportSubTypesScraped.sportSubTypes2) {
            for (let i = 0; i < sportSubTypesScraped.sportSubTypes2.length; i++) {
                for (let j = 0; j < listSportSubTypes.length; j++) {
                    if (sportSubTypesScraped.sportSubTypes2[i] === listSportSubTypes[j].title) {
                        table.push(listSportSubTypes[j])
                    }
                }
            }
            setListSportSubTypes(table)
        }
    }

    const filterTeamSubTypes = async () => {
        await webScrapingSubTypes()
        let table = []
        if (sportSubTypesScraped.sportSubTypes3) {
            for (let i = 0; i < sportSubTypesScraped.sportSubTypes3.length; i++) {
                for (let j = 0; j < listSportSubTypes.length; j++) {
                    if (sportSubTypesScraped.sportSubTypes3[i] === listSportSubTypes[j].title) {
                        table.push(listSportSubTypes[j])
                    }
                }
            }
            setListSportSubTypes(table)
        }
    }

    const filterExtremeSubTypes = async () => {
        await webScrapingSubTypes()
        let table = []
        if (sportSubTypesScraped.sportSubTypes4) {
            for (let i = 0; i < sportSubTypesScraped.sportSubTypes4.length; i++) {
                for (let j = 0; j < listSportSubTypes.length; j++) {
                    if (sportSubTypesScraped.sportSubTypes4[i] === listSportSubTypes[j].title) {
                        table.push(listSportSubTypes[j])
                    }
                }
            }
            setListSportSubTypes(table)
        }
    }

    const getAllSportSubTypes = () => {
        setListSportSubTypes(sportSubTypes)
    }

    return (
        <div>
            <div className="d-flex justify-content-center" style={{ paddingTop: "5%", paddingBottom: "3%" }}>
                <div className="wd-service-heading wd-section-heading">
                    <span className="heading-subtitle">Health SpotLight !</span>
                    <h3 className="wow fadeIn">All Sport SubTypes</h3>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8" style={{ display: "flex", flexWrap: "wrap" }}>
                        <div className='row'>
                            {listSportSubTypes && listSportSubTypes.map((sT, index) => (
                                <>
                                    {sT &&
                                        <CardSportType sT={sT} />
                                    }
                                </>
                            ))}
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="sidebar">
                            <div id="search-1" className="widget widget_search">
                                <h4 className="widget-title">Search</h4>
                                <form
                                    action="https://slidesigma.com/themes/wp/weefly/"
                                    method="get"
                                    className="relative"
                                >
                                    <input
                                        onChange={handleChange}
                                        type="search"
                                        defaultValue=""
                                        className="form-control"
                                        placeholder="Search for sport subType by Title..."
                                        name="s"
                                        required
                                    />
                                    <button type="submit" className="search_btn">
                                        <i className="fa fa-search" />
                                    </button>
                                </form>
                            </div>
                            <div id="categories-2" className="widget widget_categories">
                                <h4 className="widget-title">Sport Types</h4>
                                <ul>
                                    <Button className='btn btn-md wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button' onClick={getAllSportSubTypes}>All Sports</Button>
                                    <Button className='btn btn-md wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button' onClick={filterIndividualSubTypes}>Individual Sports</Button>
                                    <Button className='btn btn-md wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button' onClick={filterPartnerSubTypes}>Partner Sports</Button>
                                    <Button className='btn btn-md wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button' onClick={filterTeamSubTypes}>Tram Sports</Button>
                                    <Button className='btn btn-md wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button' onClick={filterExtremeSubTypes}>Extreme Sports</Button>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div id="footer-sport" className="inner-page-banner" style={{}}>
                <div className="container">
                    <div className="inner_intro text-center">
                        <h1>Safe training</h1>
                        <div className="breadcrumb">
                            <ul className="pagination-inner">
                                <li className="breadcrumb-item active" aria-current="page">
                                    Make a workout schedule.<br /> Sports are much closer!
                                </li>
                            </ul>
                            <Button variant='success' size="lg" style={{ marginTop: "5%" }}><Link href={"/sports"}>Start NOW</Link></Button>
                            <ul className="pagination-inner" />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export async function getServerSideProps() {

    const response2 = await fetch(`${process.env.backurl}/api/sportSubTypes/getAllSportSubTypes`)
    const data2 = await response2.json()

    return {
        props: {
            sportSubTypes: data2,
        },
    }
}

export default SportSubTypesPage;