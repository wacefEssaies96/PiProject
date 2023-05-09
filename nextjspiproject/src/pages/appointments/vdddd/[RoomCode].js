import Room from '@/components/appointments/vd';

import nextCookie from 'next-cookies'


function VPage({name}) {

  return <Room 
  name={name}
   />;
}




export async function getServerSideProps(context) {
  
  var data = context.query.name;
  return {
    props: {
      name: data,
    },
  };
}

export default VPage;