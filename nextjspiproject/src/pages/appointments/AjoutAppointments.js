import AppointmentForm from '@/components/appointments/AjoutAppointment'
import nextCookie from 'next-cookies'

function AppAjout({ appointment}) {
  return (
    <>
      {appointment._id=== ""
        ? <AppointmentForm operationMode="Add" />
        : <AppointmentForm operationMode="Update" appointments={appointment} />
      }
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { appointment } = nextCookie(ctx)
  if (appointment) {
    const id = appointment._id
    const res = await fetch(`${process.env.backurl}/api/app/getapp/${id}`)
    const c= await res.json()
    return {
      props: {
        appointment: c
      }
    }
  }
  return {
    props: {
      appointment: {
        _id: '',
        Date: '',
        Hour: '',
        Duration: '',
        
      }
    }
  }
}

export default AppAjout
