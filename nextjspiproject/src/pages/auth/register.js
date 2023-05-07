import Head from 'next/head'
// import Register from '@/components/users/RegisterForm'
import nextCookie from 'next-cookies'
import UsersForm from '@/components/users/UsersForm';




function RegistrationPage({ doc,user }) {
  if(user == null && doc== null){
    return (
        <UsersForm  operationMode={"Register User"}></UsersForm>
    );
  }else if(user == null && doc==1 ){
    return (
        <UsersForm   operationMode={"Register Doctor"}></UsersForm>
    );
  }else if(user && user.role && user.role == "USER"){
    return (
        <UsersForm user={user} operationMode={"Profile User"}></UsersForm>
    );
  }else if(user && user.role && user.role == "ADMIN"){
    return (
        <UsersForm user={user} operationMode={"Profile Doctor"}></UsersForm>
    );
  }
}
export default RegistrationPage;


export async function getServerSideProps(ctx) {
  const { user } = nextCookie(ctx)
  var vardoc=null;
  if(ctx.query.doc)
    vardoc= ctx.query.doc;
  if (user) {
    const id = user._id
    const res = await fetch(`${process.env.backurl}/api/users/findOne/${id}`)
    const u = await res.json()
    return {
      props: {
        doc: vardoc,
        user: u
      }
    }
  }
  return {
    props: {
      doc: vardoc,
      user: null
    },
  };
}