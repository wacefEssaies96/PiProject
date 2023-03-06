import styles from '../../styles/SportList.module.css'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

const SportHomePage = ({ sportTypes }) => {

    const [title, setTitle] = useState('')
    const router = useRouter()
    const handleChange = async (e) => {
        setTitle(e.target.value)

        if (title.length > 0) {
            const response = await fetch(`${process.env.backurl}/api/sportTypes/searchTypeByTitle/${title}`);
            const data = await response.json();
        }
    }

    const handleClick = e => {
        e.preventDefault()
        router.push('/client/SportTypes/'+title)
    }

    return (
        <div className='container'>
            <form className="d-flex float-end" role="search">
                <input onChange={handleChange} value={title} className="form-control mx-5" style={{width: "250px"}} type="search" placeholder="Search for sport type by Title" aria-label="Search"/>
                <button type='button' className='btn btn-warning' onClick={handleClick}>Search</button>
            </form><br/><br/>
            <h1>All Sports Types</h1>
            {sportTypes.map(sportType => (
                <Link href={'/client/SubSportTypes'} key={sportType._id} legacyBehavior>
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
        props : {
            sportTypes : data,
        },
    }
}
 
export default SportHomePage;