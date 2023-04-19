import Appointments from "@/components/appointments/appointment";
import nextCookie from 'next-cookies'
function AppointmentsPage({user,app}) {
  return (
    <div>
     
      <Appointments  user={user} appointment={app} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { user} = nextCookie(ctx)
  if (user) {
    const id = user._id
    const res = await fetch(`${process.env.backurl}/api/users/findOne/${id}`)
    const c= await res.json()
    const res2 = await fetch(`${process.env.backurl}/api/app/docapp/${id}`)
      const c2= await res2.json()
    
    return {
      props: {
        user: c,
        app : c2
      }
    }
  }
  const res3 = await fetch(`${process.env.backurl}/api/app/findapp`)
     const c3= await res3.json()
  return {
    props:{
      app:c3
    }
  }
  
}




export default AppointmentsPage ;