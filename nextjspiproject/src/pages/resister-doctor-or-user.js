import Head from 'next/head'

export default function DoctororUser() {

    return (
        <div className='container'>
            <Head>
                <title>Register | User Or Doctor</title>
            </Head>
            <div class="wd-members-section">
                <div class="row ">
                    <div class="col-lg-6 col-md-6">
                        <div class="members">
                            <img src="/user.png" alt="image" class="mx-auto img-fluid d-block" />
                            <div class="member-info text-center">
                                <h5>Micheal Phillips</h5>
                                <h6><i>Pharmacist</i></h6>
                                <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <ul class="inline-block social-net">
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="members">
                            <img src="doctor.png" alt="image" class="mx-auto img-fluid d-block" />
                            <div class="member-info text-center">
                                <h5>Natalie Leon</h5>
                                <h6><i>Pharmacist</i></h6>
                                <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <ul class="inline-block social-net">
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}