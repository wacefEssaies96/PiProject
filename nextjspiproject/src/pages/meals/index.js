import { fetchData } from "@/services/mix";
import Meal from "@/components/meals/Meal";



export default function Index({ mealsdb }) {
    
  return (
    <Meal mealsdb={mealsdb}></Meal>
  )
}

export async function getServerSideProps() {
  const mealsdb = await fetchData(`${process.env.backurl}/api/meal/findAllValidated`);
  
  return {
    props: {
      mealsdb : mealsdb
    }
  }
}