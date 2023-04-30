import { getYourSportVideos } from "@/services/getYourSportService";
import Head from "next/head"
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Cookies } from 'react-cookie'

const BodyShapePage = () => {

    const router = useRouter();
    const cookies = new Cookies();
    const { selectedSport } = router.query;
    const [listVideos, setListVideos] = useState([])
    const [bodyShapes, setBodyShapes] = useState([])
    const [user, setUser] = useState(cookies.get("user"))

    const getData = async () => {
        await getYourSportVideos(cookies.get('user')._id, selectedSport).then(data => setListVideos(data.updatedUser.subTypeSport.SportYoutubeVideosScraped.listVideos))
    }

    useEffect(() => {
        const getBodyShapes = async () => {
            const result = await fetch(`${process.env.backurl}/api/store/allBodyShapesScared`)
            const data = await result.json()
            setBodyShapes(data)
        }
        getBodyShapes()
        if (user.hasOwnProperty("subTypeSport"))
            setListVideos(user.subTypeSport.SportYoutubeVideosScraped.listVideos)
    }, [])

    return (
        <div style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Head>
                <title>Sport Videos | Page</title>
                <meta name='keywords' content='Sports' />
            </Head>
            <div className=" vc_custom_1578545547251 wd-section-heading-wrapper text-center">
                <div className="wd-service-heading wd-section-heading">
                    <span className="heading-subtitle">Sport PlayList</span>
                    <h3 className="wow fadeIn">
                        The Sport Best Videos For You With
                        <span className="wd-primary-color">  Health SpotLight</span>
                    </h3>
                    {user && !user.hasOwnProperty("subTypeSport") &&
                        <button disabled={listVideos.length > 0} onClick={getData} className="btn wd-btn-round-2">
                            Show Result
                        </button>}
                </div><br /><br />
            </div>
            <Carousel variant="dark">
                {listVideos.length > 0 && listVideos.map((v, i) =>
                    <Carousel.Item key={i}>
                        <div className="row ">
                            <div className="col-lg-12">
                                <div className="wd-shop-product-slider">
                                    <div className="wd-slider-wrapper">
                                        <div className="wd-slider-element" style={{ width: "50%" }}>
                                            <h5 style={{ margin: "4%" }}>{selectedSport}</h5>
                                            <a href={v.videoUrl}>
                                                <h3>
                                                    <span className="wd-product-tag" style={{ fontSize: "21px", padding: "2%" }}>{v.videoTitle}</span>
                                                </h3>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wd-shop-details">
                            <div className="wd-shop-slider-main">
                                <div className="wd-slider-item">
                                    <div className="row">
                                        <div className="col-lg-5 col-md-12 align-self-center">
                                            <div className="wd-shop-product-image">
                                            </div>
                                        </div>
                                        <div className="col-lg-7 col-md-12">
                                            <div className="wd-shop-details-container">
                                                <div className="wd-shop-details-title-wrapper">
                                                    <div className="wd-shop-product-title">
                                                        <div style={{ marginLeft: "-300px" }} className="embed-responsive embed-responsive-21by9">
                                                            <iframe className="embed-responsive-item" src={`https://www.youtube.com/embed/${v.videoId}`} title="YouTube video" allowFullScreen></iframe>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>)}
            </Carousel>
            {bodyShapes.length > 0 && <h1 style={{ marginLeft: "250px", marginTop: "10px" }}>Every Body Shape Needs</h1>}
            {bodyShapes.length > 0 && bodyShapes[0].description.map((d, i) => {
                let keys = Object.keys(d);
                return (<div key={i} className="vc_row wpb_row vc_row-fluid wd-section" style={{ display: "flex", justifyContent: "center", marginLeft: "-250px", marginRight: "-250px" }}>
                    <div className="wpb_column vc_column_container vc_col-sm-12 vc_col-lg-6 vc_col-md-6">
                        <div className="vc_column-inner">
                            <div className="wpb_wrapper">
                                <div className=" vc_custom_1577255051717 wd-section-heading-wrapper section-heading-left">
                                    <div className="wd-service-heading wd-section-heading">
                                        <span className="heading-subtitle">
                                            Needs
                                        </span>
                                        <h3 className="wow fadeIn">
                                            {keys[0]} <span style={{ fontSize: "30px" }}>body shape type</span>
                                        </h3>
                                        <p />
                                    </div>
                                </div>
                                <div className="wpb_text_column wpb_content_element  vc_custom_1576839916141">
                                    <div className="wpb_wrapper">
                                        <p>{d.needs}</p>
                                    </div>
                                    <div className="wd-service-heading wd-section-heading" style={{marginTop:"25px"}}>
                                        <span className="heading-subtitle">
                                            Average duration to achieve these specific needs
                                        </span>
                                        <p />
                                        <div className="wpb_wrapper">
                                            <p>{d.duration}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            }
            )}
            <p style={{float:"right", padding:"3%", fontSize:"25px"}}>Click <Link href={`/sports/calendar/${cookies.get('user')._id}`} style={{textDecoration:"underline", color:"#dd9933"}}>here</Link> to help you plan your training</p>
        </div>
    );
}

export default BodyShapePage;