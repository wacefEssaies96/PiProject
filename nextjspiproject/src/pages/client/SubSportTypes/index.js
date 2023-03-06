import styles from '../../../styles/SportList.module.css';
import Link from 'next/link'

const SportSubTypesPage = ({ sportTypes, sportSubTypes }) => {
    return (
        <div>
            {sportTypes.map(sportType => (
                <>
                    <h1 key={sportType._id}>All {sportType.title} Sub Types</h1>
                    {sportType.sportSubType.map(subT=>(
                        <Link href={'/client/SubSportTypes/' + subT._id} key={subT._id} legacyBehavior>
                        <a className={styles.single} key={subT._id}>
                            {sportSubTypes.map(subType =>(
                                (subType.title== subT.title) && <h3 key={subType._id}>{subType.title}</h3>
                            )
                            )}
                        </a>
                    </Link>
                    ))}
                </>
            ))}
        </div>
    );
}

export async function getServerSideProps() {
    const response = await fetch(`${process.env.backurl}/api/sportTypes/getAllSportTypes`)
    const data = await response.json()

    const response2 = await fetch(`${process.env.backurl}/api/sportSubTypes/getAllSportSubTypes`)
    const data2 = await response2.json()

    return {
        props : {
            sportTypes : data,
            sportSubTypes : data2,
        },
    }
}

export default SportSubTypesPage;