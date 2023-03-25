import styles from '@/styles/SportList.module.css' 
import Link from 'next/link'
import { useState } from 'react'

const SportHomePage = ({ sportTypes }) => {

    const [listSportTypes, setListSportTypes] = useState(sportTypes)

    const searchTitleDynamic = async (title) => {
        return await sportTypes.filter((x) => {
          let t = x.title.toLowerCase().includes(title.toLowerCase())
          if(t) {
            return x
          }
        })
      }
    
      const newList = async (e) => {
        return await searchTitleDynamic(e.target.value)
      }
    
      const handleChange = async (e) => {
        setListSportTypes(await newList(e))
      }

    return (
        <div className='container'>
            <form className="d-flex float-end" role="search">
                <input onChange={handleChange} className="form-control mx-5" style={{ width: "250px" }} type="search" placeholder="Search for sport type by Title" aria-label="Search" />
            </form><br /><br />
            <h1>All Sports Types</h1>
            {listSportTypes && listSportTypes.map(sportType => (
                <Link href={`/sub-sport-types/details/${sportType.title}`} key={sportType._id} legacyBehavior>
                    <a className={styles.single}>
                        <h3>{sportType.title}</h3>
                    </a>
                </Link>
            ))}
        </div>
    );
}

export async function getServerSideProps(context) {
    const response = await fetch(`${process.env.backurl}/api/sportTypes/getAllSportTypes`)
    const data = await response.json()

    return {
        props: {
            sportTypes: data,
        },
    }
}

export default SportHomePage;