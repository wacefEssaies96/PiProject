import AjoutForm from '@/components/appointments/AjoutForm'
import nextCookie from 'next-cookies'

function AjoutFormPage({ clinic}) {
  return (
    <>
      {clinic._id=== ""
        ? <AjoutForm operationMode="Add" />
        : <AjoutForm operationMode="Update" clinics={clinic} />
      }
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { clinic } = nextCookie(ctx)
  if (clinic) {
    const id = clinic._id
    const res = await fetch(`${process.env.backurl}/api/clinic/findOne/${id}`)
    const c= await res.json()
    return {
      props: {
        clinic: c
      }
    }
  }
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
