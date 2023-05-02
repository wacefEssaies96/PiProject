import Book from "@/components/appointments/bookapp";
import nextCookie from 'next-cookies'
function BookPage({user,app}) {
 
     
     return (
    <div>
     
      <Book user={user} appointment={app} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
    const { user} = nextCookie(ctx)
    if (user) {
      const id = user._id
      const res = await fetch(`${process.env.backurl}/api/users/findOne/${id}`)
      const c= await res.json()
      const res2 = await fetch(`${process.env.backurl}/api/app/fi`)
      const c2= await res2.json()
      return {
        props: {
          user: c,
          app : c2
        }
      }
    }
    
  }
export default BookPage ;