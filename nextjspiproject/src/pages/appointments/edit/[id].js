import AppointmentForm from '@/components/appointments/AjoutAppointment'
import nextCookie from 'next-cookies'
import Head from 'next/head'
function AjoutAppFormPage({ appointment}) {
  return (
    <div className="container">
     
       <Head>
        <title>Edit Appointment Form </title>
      </Head>
         <AppointmentForm operationMode="Update" appointments={appointment} />
          
    </div >
  )
}

export async function getServerSideProps(ctx) {
 
  
    const res = await fetch(`${process.env.backurl}/api/app/getapp/${ctx.query.id}`)
    // const c= res.json()
    // console.log("message : "+ c)
    // console.log(ctx)
  
    return {
      props: {
        appointment: await res.json()
      }
    }
  
 
}

export default AjoutAppFormPage
