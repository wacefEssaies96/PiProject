import axios from "axios";
import Head from "next/head"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import nextCookie from 'next-cookies'
import { Carousel } from "react-bootstrap";
import { async } from "regenerator-runtime";

const BodyShapePage = (ctx) => {
    const router = useRouter();
    const { shouldersWidth, hipsWidth } = router.query; // Retrieve data from query parameters
    // const { userId } = useParams()
    const [morphology, setMorphology] = useState('')
    const [shoulders, setShoulders] = useState(0)
    const [hips, setHips] = useState(0)
    const { user } = nextCookie(ctx)
    const [userId, setUserId] = useState(null);
    const [bodyShapes, setBodyShapes] = useState([]);

    useEffect(() => {
        setShoulders(shouldersWidth)
        setHips(hipsWidth)
        // Get user ID from cookie
        const userIdFromCookie = user._id;
        setUserId(userIdFromCookie);
        const getData = async () => {
            const result = await fetch(`${process.env.backurl}/api/get-your-morphology/bodyShapeType/${userId}/${shoulders}/${hips}`)
            const data = await result.json()
            setMorphology(data)
        }
        getData()

        const getBodyShapes = async () => {
            const result = await fetch(`${process.env.backurl}/api/store/allBodyShapesScared`)
            const data = await result.json()
            setBodyShapes(data)
        }
        getBodyShapes()
    }, [])

    const handleScrollToBottom = () => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
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
                                                    Bodies come in all different shapes and sizes. That's part of what makes each of us unique.<br/><br/>
                                                    It's important to know that there isn't an "average" or "typical" body.<br/><br/>
                                                    Some of us are curvier, some of us have narrower hips or broader shoulders — we're all a little bit different.<br/><br/><br/>
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
                                //1=> 2 //2=>3 //3=>1
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
                    {/* <div className="vc_row wpb_row vc_row-fluid wd-section vc_custom_1641488778972">
                        <div className="wpb_column vc_column_container vc_col-sm-12">
                            <div className="vc_column-inner">
                                <div className="wpb_wrapper">

                                    <div className=" wd-section-heading-wrapper text-center">
                                        <div className="wd-service-heading wd-section-heading">
                                            <span className="heading-subtitle">Working Process</span>
                                            <h3 className="wow fadeIn">How Does We Work</h3>
                                            <p />
                                        </div>
                                    </div>
                                    <div className="wd-how-it-works">
                                        <div className="row ">
                                            <div className="col-lg-3 col-sm-6">
                                                <div className="how-it-works-box arrow-1">
                                                    <div className="how-it-works-box-inner">
                                                        <span className="icon-box">
                                                            <img
                                                                src="../wp-content/uploads/2021/12/ww-Step1.png"
                                                                alt="icon"
                                                            />
                                                            <span className="number-box">01</span>
                                                        </span>
                                                        <h5>Step 01</h5>
                                                        <p>
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                                            elit, sed do eiusmod tempor incididunt ut labore.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-6">
                                                <div className="how-it-works-box arrow-2">
                                                    <div className="how-it-works-box-inner">
                                                        <span className="icon-box">
                                                            <img
                                                                src="../wp-content/uploads/2021/12/ww-two-leaves.png"
                                                                alt="icon"
                                                            />
                                                            <span className="number-box">02</span>
                                                        </span>
                                                        <h5>Step 02</h5>
                                                        <p>
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                                            elit, sed do eiusmod tempor incididunt ut labore.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-6">
                                                <div className="how-it-works-box arrow-1">
                                                    <div className="how-it-works-box-inner">
                                                        <span className="icon-box">
                                                            <img
                                                                src="../wp-content/uploads/2021/12/ww-growing-plant.png"
                                                                alt="icon"
                                                            />
                                                            <span className="number-box">03</span>
                                                        </span>
                                                        <h5>Step 03</h5>
                                                        <p>
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                                            elit, sed do eiusmod tempor incididunt ut labore.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-6">
                                                <div className="how-it-works-box arrow-">
                                                    <div className="how-it-works-box-inner">
                                                        <span className="icon-box">
                                                            <img
                                                                src="../wp-content/uploads/2021/12/ww-open-scissors.png"
                                                                alt="icon"
                                                            />
                                                            <span className="number-box">04</span>
                                                        </span>
                                                        <h5>Step 04</h5>
                                                        <p>
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                                            elit, sed do eiusmod tempor incididunt ut labore.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-6">
                                                <div className="how-it-works-box arrow-">
                                                    <div className="how-it-works-box-inner">
                                                        <span className="icon-box">
                                                            <img
                                                                src="../wp-content/uploads/2021/12/ww-open-scissors.png"
                                                                alt="icon"
                                                            />
                                                            <span className="number-box">05</span>
                                                        </span>
                                                        <h5>Step 05</h5>
                                                        <p>
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                                            elit, sed do eiusmod tempor incididunt ut labore.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-sm-6">
                                                <div className="how-it-works-box arrow-">
                                                    <div className="how-it-works-box-inner">
                                                        <span className="icon-box">
                                                            <img
                                                                src="../wp-content/uploads/2021/12/ww-open-scissors.png"
                                                                alt="icon"
                                                            />
                                                            <span className="number-box">06</span>
                                                        </span>
                                                        <h5>Step 06</h5>
                                                        <p>
                                                            Lorem ipsum dolor sit amet, consectetur adipisicing
                                                            elit, sed do eiusmod tempor incididunt ut labore.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div >
    );
}

export default BodyShapePage;