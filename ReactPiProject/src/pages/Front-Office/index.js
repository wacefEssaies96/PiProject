import styles from '../../styles/SportList.module.css';
import Link from 'next/link'

const SportHomePage = ({ sportTypes }) => {
    return (
        <div>
            <h1>All Sports Types</h1>
            {sportTypes.map(sportType => (
                <Link href={'/Front-Office/SubSportTypes'} key={sportType._id} legacyBehavior>
                    <a className={styles.single}>
                        <h3>{sportType.title}</h3>
                    </a>
                </Link>
            ))}
        </div>
    );
}

export async function getServerSideProps() {
    const response = await fetch(`${process.env.backurl}/api/sportTypes/getAllSportTypes`)
    const data = await response.json()
    return {
        props : {
            sportTypes : data,
        },
    }
}
 
export default SportHomePage;