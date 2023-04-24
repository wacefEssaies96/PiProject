import { getYourSportVideos } from "@/services/getYourSportService";
import Head from "next/head"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Cookies } from 'react-cookie'

const BodyShapePage = () => {

    const router = useRouter();
    const cookies = new Cookies();
    const { selectedSport } = router.query;
    const [listVideos, setListVideos] = useState([])

    const getData = async () => {
        await getYourSportVideos(cookies.get('user')._id, selectedSport).then(data => setListVideos(data.updatedUser.subTypeSport.SportYoutubeVideosScraped.listVideos))
    }

    useEffect(() => {
        if (cookies.get("user").hasOwnProperty("subTypeSport"))
            setListVideos(cookies.get("user").subTypeSport.SportYoutubeVideosScraped.listVideos)
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
                    {!cookies.get("user").hasOwnProperty("subTypeSport") &&
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
        </div>
    );
}

export default BodyShapePage;