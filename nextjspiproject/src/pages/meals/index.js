import { fetchData } from "@/services/mix";
import Meal from "@/components/meals/Meal";
import nextCookie from 'next-cookies';



export default function Index({ cu,mealsdb }) {
    
  return (
    <Meal cu={cu} mealsdb={mealsdb}></Meal>
  )
}

export async function getServerSideProps(context) {
  
  var { user } = nextCookie(context)
  const mealsdb = await fetchData(`${process.env.backurl}/api/meal/findAllValidated`);
  
  if (user) {
    return {
      props: {
        cu:user,
        mealsdb : mealsdb
      }
    }
  }

  return {
    props: {
      cu:null,
      mealsdb : mealsdb
    }
  }
}