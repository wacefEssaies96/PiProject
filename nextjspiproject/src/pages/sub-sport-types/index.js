import Link from 'next/link'
import { useState } from 'react';

const SportSubTypesPage = ({ sportSubTypes }) => {
    const [listSportSubTypes, setListSportSubTypes] = useState(sportSubTypes)

    const searchTitleDynamic = async (title) => {
        return await sportSubTypes.filter((x) => {
          let t = x.title.toLowerCase().includes(title.toLowerCase())
          if(t) {
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
    return (
        <div>
            <div className="d-flex justify-content-center" style={{ paddingTop: "5%" }}>
                <div className="wd-service-heading wd-section-heading">
                    <span className="heading-subtitle">Health SpotLight !</span>
                    <h3 className="wow fadeIn">All Sport SubTypes</h3>
                </div>
            </div>
            <div className='sidebar' style={{ width: "20%", marginLeft:"70%", marginTop:"3%"}}>
                <div id="search-1" className="widget widget_search">
                    <h4 className="widget-title">Search</h4>
                    <form className="relative" role="search">
                        <input onChange={handleChange} type="search" className="form-control" placeholder="Search by Title ..." required/>
                        <button className="search_btn"><i className="fa fa-search"></i></button>
                    </form>
                </div>
            </div>
            {listSportSubTypes.map(sT => (
                <>
                    <div className="vc_row wpb_row vc_row-fluid wd-section">
                        <div className="wpb_column vc_column_container vc_col-sm-12 vc_col-lg-6 vc_col-md-6">
                            <div className="vc_column-inner"><div className="wpb_wrapper">
                                <div className="wpb_single_image wpb_content_element vc_align_center  vc_custom_1641317696669">
                                    <video width="100%" height="100%" controls style={{ paddingLeft: "11%", paddingRight: "5%" }}>
                                        <source src={`${process.env.backurl}/${sT.demoVideo}`} />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="wd-about-container wpb_column vc_column_container vc_col-sm-12 vc_col-lg-6 vc_col-md-6">
                            <div className="vc_column-inner"><div className="wpb_wrapper">
                                <span className="heading-subtitle" style={{ fontSize: "35px" }}>{sT?.title}</span>
                                <div className="wpb_text_column wpb_content_element  vc_custom_1580296943324" >
                                    <div className="wpb_wrapper">
                                        <h4>Advantages</h4>
                                        <p>{sT?.advantages}</p>
                                        <h4>Limits</h4>
                                        <p>{sT?.limits}</p>
                                    </div>
                                </div>
                                <div className="section-heading-left ">
                                    <Link href={'/sub-sport-types/details/' + sT._id} className="btn wd-btn-round">Learn More</Link>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    {listSportSubTypes.indexOf(sT)+1<listSportSubTypes.length && <div className="d-flex justify-content-center">
                        <hr style={{ width: "50%", border: "2px solid #016837", backgroundColor: "#016837" }} />
                    </div>}
                </>
            ))}
        </div>
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