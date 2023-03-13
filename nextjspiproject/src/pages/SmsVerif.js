import DoctorsForm from '@/components/users/doctorform'
import Link from 'next/link'
import { Component } from 'react'
import { Form } from 'react-bootstrap'
import Navigation from '../components/Navigation'
import { handleAuthSSR } from '../services/auth'

export default function SmSverify() {

    return (

        <Form >
            
            <div className="display flex">
            <Form.Control name="id" type="hidden"></Form.Control>
            <Form.Group className="mb-3">
                <Form.Control style={{backgroundColor:"#0b1230",width: "50px", fontSize:"32px",padding: "10px", textAlign:"center", borderRadius: "5px", margin: "2px", border:"2px solid #55525c", fontWeight:"bold", color: "#fff" ,outLine: "none", transition: "all 0.1s"}} id="valeur_1" type="number"  />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control id="valeur_2"  type="number"  style={{backgroundColor:"#0b1230",width: "50px", fontSize:"32px",padding: "10px", textAlign:"center", borderRadius: "5px", margin: "2px", border:"2px solid #55525c", fontWeight:"bold", color: "#fff" ,outLine: "none", transition: "all 0.1s"}} required/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control name="valeur_3" type="number" style={{backgroundColor:"#0b1230",width: "50px", fontSize:"32px",padding: "10px", textAlign:"center", borderRadius: "5px", margin: "2px", border:"2px solid #55525c", fontWeight:"bold", color: "#fff" ,outLine: "none", transition: "all 0.1s"}} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control id="valeur_4"  type="number" style={{backgroundColor:"#0b1230",width: "50px", fontSize:"32px",padding: "10px", textAlign:"center", borderRadius: "5px", margin: "2px", border:"2px solid #55525c", fontWeight:"bold", color: "#fff" ,outLine: "none", transition: "all 0.1s"}} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Control id="valeur_5" type="number" style={{backgroundColor:"#0b1230",width: "50px", fontSize:"32px",padding: "10px", textAlign:"center", borderRadius: "5px", margin: "2px", border:"2px solid #55525c", fontWeight:"bold", color: "#fff" ,outLine: "none", transition: "all 0.1s"}} required />
            </Form.Group>
           
            <Form.Group className="mb-3">
                   <Form.Control id="valeur_6" type="number" style={{backgroundColor:"#0b1230",width: "50px", fontSize:"32px",padding: "10px", textAlign:"center", borderRadius: "5px", margin: "2px", border:"2px solid #55525c", fontWeight:"bold", color: "#fff" ,outLine: "none", transition: "all 0.1s"}} required />
            </Form.Group>

            </div> 
            <script>
                



            </script>
    
        </Form>
       


    )

}
