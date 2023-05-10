import { loginService } from '@/services/auth';
import { useRouter } from 'next/router';
import HomePage from '@/components/layouts/HomePage'
import HomeUser from '@/components/layouts/HomeUser';
import { fetchData } from '@/services/mix';

export default function Home({prods,doctors,articles,meals}) {

  const router = useRouter()

  // if (router.query.hasOwnProperty('token')) {
  //   const user = {
  //     _id: router.query.id,
  //     email: router.query.email,
  //     fullname: router.query.name,
  //     role: 'USER'
  //   }
  //   const token = router.query.token
  //   loginService({ token, user })
  //   window.location = '/'
  // }

  return (
    <>
      <HomeUser prods={prods} doctors={doctors} articles={articles} meals={meals} />
      {/* <HomePage /> */}
    </>
  )
}

export async function getServerSideProps(context) {

  const prods = await fetchData(`${process.env.backurl}/api/admin/products`);
  const doctors = await fetchData(`${process.env.backurl}/api/users/findAllDoctors`);
  const articles = await fetchData(`${process.env.backurl}/api/admin/articles/find-all`);
  const meals = await fetchData(`${process.env.backurl}/api/meal/findAll`);
  
  return {
    props: {
      articles: articles,
      meals:meals,
      prods:prods,
      doctors:doctors
    }
  }
  
  // const user = await fetchSubTypeData(`${process.env.backurl}/api/users/findOne/${id}`)
  // const data = await fetchSubTypeData(`${process.env.backurl}/api/scrapedYoutubeVideos/userVideos/${id}`)
  // const rates = await fetchSubTypeData(`${process.env.backurl}/api/sportsRating/userRates/${id}`)
  // const allUserProgresses = await fetchSubTypeData(`${process.env.backurl}/api/sportsProgress/getAllUserProgresses/${id}`)

  // return {
  //     props: {
  //         user: user,
  //         videos: data,
  //         ratesUser: rates,
  //         allUserProgresses: allUserProgresses
  //     }
  // }
}
