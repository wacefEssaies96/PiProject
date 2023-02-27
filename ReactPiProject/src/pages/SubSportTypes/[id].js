export const getServerSideProps = async (context) => {
    
    const id = context.params.id;
    const res = await fetch(`${process.env.backurl}/api/sportSubTypes/` + id);
    const data = await res.json();

    return {
        props : { sportSubType: data }
    }
}

const Details = ({sportSubType}) => {
    return (
            <>
                <h1>All {sportSubType.title} Details</h1>
                <h3>{sportSubType.demoVideo}</h3>
                <h3>{sportSubType.advantages}</h3>
                <h3>{sportSubType.limits}</h3>
            </>
    );
}
 
export default Details;