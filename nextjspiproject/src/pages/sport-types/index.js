import styles from '@/styles/SportList.module.css'
import Link from 'next/link'
import { useState } from 'react'

const SportHomePage = ({ sportTypes }) => {

    const [listSportTypes, setListSportTypes] = useState(sportTypes)

    const searchTitleDynamic = async (title) => {
        return await sportTypes.filter((x) => {
            let t = x.title.toLowerCase().includes(title.toLowerCase())
            if (t) {
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
            <h1>All Sports Types</h1>
            <div className='sidebar' style={{ width: "25%", marginLeft: "70%", marginTop: "3%" }}>
                <div id="search-1" className="widget widget_search">
                    <h4 className="widget-title">Search</h4>
                    <form className="relative" role="search">
                        <input onChange={handleChange} type="search" className="form-control" placeholder="Search by Title ..." required />
                        <button className="search_btn"><i className="fa fa-search"></i></button>
                    </form>
                </div>
            </div>
            {listSportTypes && listSportTypes.map(sportType => (
                <Link href={`/sport-types/details/${sportType.title}`} key={sportType._id} legacyBehavior>
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