import Vdh from '@/components/appointments/vdh';
import nextCookie from 'next-cookies'

function HPage({name, user}) {
    return (
      <div>
       
       <Vdh name={name} user={user} />
      </div>
    );
  }
  
  

export async function getServerSideProps(context) {
  
  var data = context.query.name;
  const { user} = nextCookie(context)

  if (user) {
    const id = user._id
        
    const res = await fetch(`${process.env.backurl}/api/users/findOne/${id}`)
    const c= await res.json()
  return {
    props: {
      name: data,
      user: c
    },
  };
}
}
  export default HPage;

  