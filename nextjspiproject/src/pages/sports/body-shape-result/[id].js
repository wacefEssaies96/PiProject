import Head from "next/head"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Cookies } from 'react-cookie'
import { Button, Carousel, Form } from "react-bootstrap";
import { getYourMorphology } from "@/services/getYourSportService";
import Link from "next/link";

const BodyShapePage = () => {
    // set up cookies
    const cookies = new Cookies();
    const router = useRouter();
    const { shouldersWidth, hipsWidth } = router.query; // Retrieve data from query parameters
    const [morphology, setMorphology] = useState('')
    const [bodyShapes, setBodyShapes] = useState([])
    const [recommendedSports, setRecommendedSports] = useState('')
    const [selectedSport, setSelectedSport] = useState(null)

    const getData = async () => {
        await getYourMorphology(cookies.get('user')._id, shouldersWidth, hipsWidth).then(data => setMorphology(data))
    }

    useEffect(() => {
        const getBodyShapes = async () => {
            const result = await fetch(`${process.env.backurl}/api/store/allBodyShapesScared`)
            const data = await result.json()
            setBodyShapes(data)
        }
        getBodyShapes()
    }, [])

    const handleScrollToBottom = async () => {
        const result = await fetch(`${process.env.backurl}/api/sportSubTypes/sport-type/${cookies.get('user')._id}/${shouldersWidth}/${hipsWidth}`)
        const data = await result.json()
        setRecommendedSports(data.recommendedSports)
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    };

    const handleSelectChange = (event) => {
        setSelectedSport(event.target.value); // Update selected value when the select option changes
    }

    const handleClick = () => {
        // Pass data as query parameters in the URL
        router.push({
            pathname: `/sports/sport-videos/${cookies.get('user')._id}`,
            query: { selectedSport },
        });
    };

    return (
        <div style={{ marginTop: "2%", marginBottom: "2%" }}>
            <Head>
                <title>Body Shape | Page</title>
                <meta name='keywords' content='Sports' />
            </Head>
            <div className="wd-sections">
                <div className="container">
                    <div className="vc_row wpb_row vc_row-fluid wd-section">
                        <div className="wpb_column vc_column_container vc_col-sm-12">
                            <div className="vc_column-inner">
                                <div className="wpb_wrapper">
                                    <div className=" vc_custom_1571382109622 wd-section-heading-wrapper text-center">
                                        <button onClick={getData} className="btn wd-btn-round-2">
                                            Show Result
                                        </button><br /><br />
                                        <div className="wd-service-heading wd-section-heading">
                                            <span className="heading-subtitle">Your Body Shape Type</span>
                                            <h3 className="wow fadeIn">{morphology.morphology}</h3>
                                            <p />
                                        </div>
                                    </div>
                                    <div className="row ">
                                        <div className="col-lg-6">
                                            <div className="about-image shadow-1 mb-md-30 relative  mbl-spacing">
                                                <img
                                                    src="/bodiesShapes.webp"
                                                    className="w-100 img"
                                                    alt=""
                                                    style={{ border: "solid #016837" }}
                                                />
                                                <div className="about-count shadow-blue bg-blue white" style={{ marginRight: "70%", marginTop: "-100px" }}>
                                                    <h3 className="fs-45 f-700">
                                                        <span className="counter" style={{ fontSize: "30px" }}>Every body is beautiful</span>
                                                    </h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 center-class">
                                            <div className="about-div padding-30">
                                                <h5 className="mb-15">
                                                    Every body is beautiful
                                                </h5>
                                                <p>
                                                    Bodies come in all different shapes and sizes. That's part of what makes each of us unique.<br /><br />
                                                    It's important to know that there isn't an "average" or "typical" body.<br /><br />
                                                    Some of us are curvier, some of us have narrower hips or broader shoulders — we're all a little bit different.<br /><br /><br />
                                                    Still, most of us can categorize our shape into a few broad categories.
                                                </p>
                                                <p>
                                                </p>
                                                <div className="section-heading-left">
                                                    <button onClick={handleScrollToBottom} href="#" className="btn wd-btn-round-2">
                                                        Strat Training Now
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <>
                        <div className=" wd-section-heading-wrapper text-center">
                            <div className="wd-service-heading wd-section-heading">
                                <span className="heading-subtitle">Body Shapes</span>
                                <h3 className="wow fadeIn">
                                    Different <span className="wd-primary-color">Body Shapes Types</span>
                                </h3>
                                <p />
                            </div>
                        </div>
                        <Carousel variant="dark">
                            {bodyShapes.length > 0 && bodyShapes[1].image.map((img, i) => {
                                let keys = Object.keys(img);
                                let values = []
                                for (let index = 0; index < bodyShapes[0].description.length; index++) {
                                    values.push(Object.values(bodyShapes[0].description[index]))
                                }
                                let valuesSlice = values.slice(3, 8)
                                let table = [valuesSlice[2], valuesSlice[0], valuesSlice[1], valuesSlice[3], valuesSlice[4]]
                                return <Carousel.Item key={i}>
                                    <div className="wd-members-section" style={{ marginLeft: "35%", width: "100%" }}>
                                        <div className="row ">
                                            <div className="col-lg-4 col-md-6">
                                                <div className="members">
                                                    <img
                                                        src={`${img[keys[0]]}`}
                                                        alt="image"
                                                        className="mx-auto img-fluid d-block"
                                                    />
                                                    <div className="member-info text-center">
                                                        <h5>{keys[0]}</h5>
                                                        <p>
                                                            {table[i]}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Carousel.Item>
                            })}
                        </Carousel>
                    </>
                </div>
                <div id="sportTypeForYou" className="inner-page-banner" style={{ height: "700px" }}>
                    {recommendedSports != '' && <div className="container">
                        <div className="inner_intro text-center">
                            <h1 style={{ marginTop: "2%" }}>The best Sports for You accourding to your Body Shape</h1>
                            <h2 style={{ color: "white", marginTop: "2%" }}>{recommendedSports}</h2>
                        </div><br />
                        <Form.Select
                            value={selectedSport} // Set the selected value
                            onChange={handleSelectChange} // Call the handleSelectChange function on change
                            style={{ width: "40%", marginLeft: "30%" }}>
                            <option>Select Your Favorite Sport</option>
                            <option value="Swimming">Swimming</option>
                            <option value="Pilates">Pilates</option>
                            <option value="Cycling">Cycling</option>
                            <option value="Yoga">Yoga</option>
                        </Form.Select>
                        {selectedSport &&
                            <Button className="btn btn-md wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button" style={{marginTop:"15px", marginLeft:"20%"}} onClick={handleClick}>
                                <Link className="btn btn-md wd-btn-round-2 text-uppercase font-weight-bold mb-2 submit_button" style={{ color: "white" }} href={`/sports/sport-videos/${cookies.get('user')._id}`}>
                                    Please click here {selectedSport} to see sport videos
                                </Link>
                            </Button>
                        }
                    </div>}
                </div>
            </div>
        </div >
    );
}

export default BodyShapePage;