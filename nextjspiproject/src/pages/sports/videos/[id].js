import AddSportRating from "@/components/AddSportRating";
import { fetchSubTypeData } from "@/services/SportSubTypeServices";
import { postProgress, updateProgress } from "@/services/sportProgress";
import Head from "next/head"
import { useEffect, useState } from "react";
import { Button, Carousel, ProgressBar } from "react-bootstrap";

const VideosPage = ({ user, videos, ratesUser }) => {

    const [storedRating, setStoredRating] = useState(null)
    const [filled, setFilled] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (ratesUser) {
            let total = 0
            let average = 0
            for (let index = 0; index < ratesUser.length; index++) {
                total += ratesUser[index].rating
            }
            average = total / ratesUser.length
            setStoredRating(average)
        }
    }, [])

    useEffect(() => {
        if (filled < 100 && isRunning) {
            setTimeout(() => setFilled(prev => prev += 2), 50)
        }
    }, [filled, isRunning])

    const handleStart = async (videoId) => {
        await postProgress(user._id, videoId)
    }

    // Track the current progress of the video being watched by the user
    const onProgress = (event) => {
        setProgress(event.target.getCurrentTime());
    };

    // Send update requests to your server that contain the current progress of the video being watched by the user
    // useEffect(() => {
    //     for (let index = 0; index < videos.length; index++) {
    //         (function (i) {
    //             setInterval(async () => {
    //                 await updateProgress(user._id, videos[i].videoId)
    //             }, 5000);
    //         })(index);
    //     }
    // }, [progress]);

    const handleEdit = () => {
        setIsRunning(true)
        if (filled < 100 && isRunning) {
            setProgress(10)
            setTimeout(() => setFilled(prev => prev += 10), 50)
        }
    }

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
                </div><br /><br />
            </div>
            <Carousel variant="dark">
                {videos.length > 0 && videos.map((v, i) =>
                    <Carousel.Item key={i}>
                        <div className="row ">
                            <div className="col-lg-12">
                                <div className="wd-shop-product-slider">
                                    <div className="wd-slider-wrapper">
                                        <div className="wd-slider-element" style={{ width: "50%" }}>
                                            <a href={v.videoUrl}>
                                                <h3 style={{ marginTop: "9%" }}>
                                                    <span className="wd-product-tag" style={{ fontSize: "18px", padding: "2%" }}>{v.videoTitle}</span>
                                                </h3>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: "70%", paddingLeft: "410px", paddingTop: "3%" }}>
                            <ProgressBar animated now={filled} label={`${progress}%`} variant="success" /><br />
                            <Button variant="success" onClick={() => handleStart(v.videoId)}>Start</Button>
                            <Button variant="success" onClick={handleEdit}>Start Video 1</Button>
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
                                                            <iframe onProgress={onProgress} className="embed-responsive-item" src={`https://www.youtube.com/embed/${v.videoId}`} title="YouTube video" allowFullScreen></iframe>
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
            <div className="container" style={{ marginLeft: "400px", marginTop: "5%", marginBottom: "5%" }}>
                <h1>You can give a rate to our proposition</h1>
                <div style={{ marginLeft: "200px" }}>
                    <AddSportRating averagePerUser={storedRating} size="50" sportSubTypeTitle={user.subTypeSport && user.subTypeSport.title} userId={user._id} />
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const user = await fetchSubTypeData(`${process.env.backurl}/api/users/findOne/${id}`)
    const data = await fetchSubTypeData(`${process.env.backurl}/api/scrapedYoutubeVideos/userVideos/${id}`)
    const rates = await fetchSubTypeData(`${process.env.backurl}/api/sportsRating/userRates/${id}`)

    return {
        props: {
            user: user,
            videos: data,
            ratesUser: rates
        }
    }
}

export default VideosPage;