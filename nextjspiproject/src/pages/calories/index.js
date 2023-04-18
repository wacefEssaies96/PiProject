import CalorieForm from "@/components/calories/CalorieForm";
import nextCookie from 'next-cookies'

export default function Index({ user }){
    return(
        <>  
        <CalorieForm user={user} />
        </>
    )
}

export async function getServerSideProps(ctx) {
  const { user } = nextCookie(ctx)
  if (user) {
    const id = user._id
    const res = await fetch(`${process.env.backurl}/api/users/findOne/${id}`)
    const u = await res.json()
    return {
      props: {
        user: u
      }
    }
  }
  return {
    props: {
      user: {
        height: "",
        weight: "",
        dateOfBirth: "",
        gender: "",
      }
    }
  }
}