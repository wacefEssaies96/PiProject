import AjoutForm from '@/components/appointments/AjoutForm'
import nextCookie from 'next-cookies'
import Head from 'next/head'
function AjoutFormPage({ clinic}) {
  return (
    <div className="container">
     
       <Head>
        <title>Edit Clinic Form | User</title>
      </Head>
         <AjoutForm operationMode="Update" clinics={clinic} />
          
    </div >
  )
}

export async function getServerSideProps(ctx) {
 
  // if (ctx.query.id) {
  //   const res = await fetch(`${process.env.backurl}/api/clinic/findOne/${ctx.query.id}`)
  //   const c= res.json()
  //   console.log("message : "+ c)

  //   return {
  //     props: {
  //       clinic: res
  //     }
  //   }
  // }
  console.log(ctx.query.id)
  return {
    props: {
      clinic: {
        _id: '',
        Name: '',
        Adress: '',
        phone_number: '',
        
      }
    }
  }
}

export default AjoutFormPage