import DoctorsForm from '@/components/users/doctorform'
import Link from 'next/link'
import { Component, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import Navigation from '../components/Navigation'
import { handleAuthSSR, loginService } from '../services/auth'
import { BsFillShieldLockFill, } from "react-icons/bs"
import OtpInput from 'react18-input-otp'
import { CgSpinner } from "react-icons/cg"
import nextCookie from 'next-cookies'
import { Cookies } from 'react-cookie'
import { useRouter } from 'next/router'





export default function VerifySms(props) {
    const router = useRouter()
    const [codeVerif, setCodeVerif] = useState("");
    const [loading, setLoading] = useState(false);
    const cookies = new Cookies()
    const [auth, setAuth] = useState({
        token: cookies.get('token') || null,
        error: '',
        email: null,
        password: null,
    })
    const handleChange = (codeVerif) => setCodeVerif(codeVerif);
    useEffect(() => {
        console.log(props.code)
    })
    const handleClick = async () => {
        console.log(props.code , codeVerif)
        const token = props.token
        const user = props.user
        if (props.code === parseInt(codeVerif)) {
            await loginService( props.token, props.user )
            setAuth({
                token,
                error: null,
            })
            if (user['role' == "ADMIN"]) {
                router.push('/admin')
            }
            else if (user['role' == "User"]) {
                router.push('/user')
            }
            else if (user['role' == "DOCTOR"]) {
                router.push('/doctor')
            }
            else {
                router.push('/')
            }
        }

    }


    return (

        <div>
            <div className="w-80 flex flex-col gap-4 rounded-lg p-4" >
                <h1 className='text-center leading-normal text-black font-medium text-3xl mb-6'>
                    Two factor<br />authentication

                </h1>
                <>
                    <div className=' text-center bg-white w-fit mx-auto p-4 rounded-full'>
                        <BsFillShieldLockFill size={30} />
                        <br />
                    </div>


                    <div className='container d-flex align-items-center justify-content-center'>
                        <label htmlFor="ph" className=" font-bold text-2xl text-black ">
                            Enter your OTP
                        </label>
                    </div>
                    <br />
                    <div className='container d-flex align-items-center justify-content-center' >
                        <OtpInput
                            value={codeVerif}
                            onChange={handleChange}

                            numInputs={6}
                            separator={<span style={{ width: "8px" }}></span>}
                            isInputNum={true}
                            shouldAutoFocus={true}
                            inputStyle={{
                                border: "1px solid ",
                                borderRadius: "8px",
                                width: "54px",
                                height: "54px",
                                fontSize: "12px",
                                color: "#000",
                                fontWeight: "400",
                                caretColor: "blue"
                            }}
                            focusStyle={{
                                border: "1px solid #CFD3DB",
                                outline: "none"
                            }} />
                    </div>

                    <br />
                    <div className='container d-flex align-items-center justify-content-center' >
                        <button onClick={handleClick} style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 12,
                            borderRadius: 10,
                            elevation: 8,
                            border: 'none',
                            backgroundColor: '#018749'
                        }}>
                            <span style={{
                                fontSize: 16,
                                lineWidth: 21,
                                fontWeight: 'bold',
                                letterSpacing: 0.25,
                                color: 'white',
                            }}>Verify OTP</span>
                            {
                                loading && <CgSpinner size={20} className="mt-1 animate-spin" />
                            }

                        </button>
                    </div>
                </>
            </div>
        </div>
    )
}
