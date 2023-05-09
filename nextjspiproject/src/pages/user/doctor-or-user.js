import Head from 'next/head'
import Link from 'next/link'
import { AiFillGoogleCircle } from 'react-icons/ai'

export default function DoctororUser() {

    const googleAuth = () => {
        window.open(
          `${process.env.backurl}/auth/google`,
          "_self"
        );
      };
      const linkedInAuth = () => {
        window.open(
          `${process.env.backurl}/auth/linkedin`,
          "_self"
        );
      };

    return (
        <div className='container'>
            <Head>
                <title>Register | User Or Doctor</title>
            </Head>
            <div className="wd-members-section">
                <div className="row ">
                    <div className="col-lg-6 col-md-6">
                        <div className="members">
                            <img src="/client.png" alt="image" className="mx-auto img-fluid d-block" style={{width:"350px"}}/>
                            <div className="member-info text-center">
                                <h5>Register as a user</h5><br/>
                                <h6><Link id="link-register" href={"/auth/register"}>Register</Link></h6><br/>
                                <p>You can also register with Google or LinkedIn</p>
                                <ul className="inline-block social-net">
                                    {/* <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i className="fab fa-twitter"></i></a></li> */}
                                    <li><Link href="#" onClick={googleAuth}><i className='fab'><AiFillGoogleCircle size={22}></AiFillGoogleCircle></i></Link></li>
                                    <li><a href="#" onClick={linkedInAuth}><i className="fab fa-linkedin-in"></i></a></li>
                                    {/* <li><a href="#"><i className="fab fa-instagram"></i></a></li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="members">
                            <img src="/doctor.png" alt="image" className="mx-auto img-fluid d-block" style={{width:"350px"}}/>
                            <div className="member-info text-center">
                                <h5>Register as a doctor</h5><br/>
                                <h6><Link id="link-register" href={"/auth/register?doc=1"}>Register</Link></h6><br/>
                                <p>You can also register with Google or LinkedIn</p>
                                <ul className="inline-block social-net">
                                    <li><Link href="#" onClick={googleAuth}><i className='fab'><AiFillGoogleCircle size={22}></AiFillGoogleCircle></i></Link></li>
                                    <li><a href="#" onClick={linkedInAuth}><i className="fab fa-linkedin-in"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}