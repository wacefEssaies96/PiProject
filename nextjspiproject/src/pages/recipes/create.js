import { fetchData } from '@/services/mix';
import {  Suspense,lazy } from 'react';
import nextCookie from 'next-cookies';
import NotFound from '../404';


const RecipeForm = lazy(() => import('@/components/recipes/RecipeForm'))

export default function Create({cu,mealsdb}) {
    
  if(cu !== null ){
      return (
        <Suspense> 
            <RecipeForm mealsdb={mealsdb} ></RecipeForm>
        </Suspense>
      );
  }
  else{
    return (
        <NotFound/>
    );
  }
}
export async function getServerSideProps(ctx) {

    const { user } = nextCookie(ctx)

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
            mealsdb : mealsdb,
            cu: null,
        },
    };
}