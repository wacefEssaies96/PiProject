import DoctorsForm from '@/components/users/doctorform'
import nextCookie from 'next-cookies'

function Doctor({ user }) {
  return (
    <>
      {user._id === ""
        ? <DoctorsForm operationMode="Add" />
        : <DoctorsForm operationMode="Update" doctor={user} />
      }
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
        _id: '',
        fullname: '',
        email: '',
        password: '',
        phone: 0,
        height: 0,
        weight: 0,
        address: '',
        disease: '',
        gender: ''
      }
    }
  }
}

export default Doctor
