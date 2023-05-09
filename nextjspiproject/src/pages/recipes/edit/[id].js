import { fetchData } from "@/services/mix";
import {  Suspense,lazy } from 'react';
import nextCookie from 'next-cookies';
import NotFound from "@/pages/404";

const RecipeForm = lazy(() => import('@/components/recipes/RecipeForm'))

export default function EditMeal({ cu, recipe,mealsdb }) {

    if(cu !== null ){
        return (
          <Suspense> 
            <RecipeForm recipe={recipe} mealsdb={mealsdb}  ></RecipeForm>
          </Suspense>
        );
    }
    else{
      return (
          <NotFound/>
      );
    }
}

export async function getServerSideProps(context) {
    var { user } = nextCookie(context)

    const recipe = await fetchData(`${process.env.backurl}/api/recipe/findOne/${context.query.id}`);
    
    const mealsdb = await fetchData(`${process.env.backurl}/api/meal/findAllValidated`);
  
    if (user) {

        if(user._id !== recipe.user._id ){
            user=null;
        }
        return {
            props: {
                recipe: recipe,
                mealsdb : mealsdb,
                cu:user,
            }
        }

    }
    
    return {
        props: {
            recipe: recipe,
            mealsdb : mealsdb,
            cu: null,
        },
    };
}