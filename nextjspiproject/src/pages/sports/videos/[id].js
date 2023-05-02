import AddSportRating from "@/components/AddSportRating";
import { fetchSubTypeData } from "@/services/SportSubTypeServices";
import { deleteProgress, postProgress } from "@/services/sportProgress";
import Head from "next/head"
import { useEffect, useState } from "react";
import { Button, Carousel, ProgressBar } from "react-bootstrap";
import Confetti from "react-confetti";
import useWindowSize from 'react-use/lib/useWindowSize'

const VideosPage = ({ user, videos, ratesUser, allUserProgresses }) => {

    const [storedRating, setStoredRating] = useState(null)
    const [progress, setProgress] = useState(0)
    const [disable, setDisable] = useState(false)
    const [disableCancel, setDisableCancel] = useState(false)
    const { width, height } = useWindowSize()
    const [percent, setPercent] = useState(0)

    useEffect(() => {
        setPercent(progress);
    }, [progress]);

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

        if (allUserProgresses) {
            let totalProgress = 0
            for (let index = 0; index < allUserProgresses.length; index++) {
                totalProgress += allUserProgresses[index].progress
            }
            setProgress(totalProgress)
        }
    }, [])

    const handleStart = async (videoId) => {
        if (progress < 100) {
            let newProgress = progress + 10
            setProgress(newProgress)
            console.log(allUserProgresses);
            for (let index = 0; index < allUserProgresses.length; index++) {
                console.log(allUserProgresses[index].video === videoId);
                if (allUserProgresses[index].video === videoId) {
                    setDisable(true)
                }
            }
            await postProgress(user._id, videoId)
        }
    }

    const handleDelete = async (id) => {
        for (let index = 0; index < allUserProgresses.length; index++) {
            if (allUserProgresses[index].video === id) {
                let videoId = allUserProgresses[index]._id
                await deleteProgress(videoId)
                setProgress(prev => prev - 10)
                setDisableCancel(true)
            }
        }
    }

    return (
        <div style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Head>
                <title>Sport Videos | Page</title>
                <meta name='keywords' content='Sports' />
            </Head>
            {progress === 100 && <Confetti width={width} height={height} style={{ position: "fixed" }} />}
            <div className=" vc_custom_1578545547251 wd-section-heading-wrapper text-center">
                <div className="wd-service-heading wd-section-heading">
                    <span className="heading-subtitle">Sport PlayList</span>
                    <h3 className="wow fadeIn">
                        The Sport Best Videos For You With
                        <span className="wd-primary-color">  Health SpotLight</span>
                    </h3>
                </div><br /><br />
            </div>
            <Carousel onSlid={() => setDisable(false)} variant="dark">
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
                            <ProgressBar animated now={percent} label={`${percent}%`} variant="success" /><br />
                            <p>Click on the button to start your training video</p><Button disabled={disable} variant="success" onClick={() => handleStart(v.videoId)}>Start</Button>
                            <Button disabled={disableCancel} variant="danger" onClick={() => handleDelete(v.videoId)}>Cancel</Button>
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
    const allUserProgresses = await fetchSubTypeData(`${process.env.backurl}/api/sportsProgress/getAllUserProgresses/${id}`)

    return {
        props: {
            user: user,
            videos: data,
            ratesUser: rates,
            allUserProgresses: allUserProgresses
        }
    }
}

export default VideosPage;