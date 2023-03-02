export default function Details ({sportSubType}) {
    return (
            <>
                <h1>All {sportSubType.title} Details</h1>
                <h3>{sportSubType.demoVideo}</h3>
                <h3>{sportSubType.advantages}</h3>
                <h3>{sportSubType.limits}</h3>
            </>
    );
}

export const getServerSideProps = async (context) => {
    
    const res = await fetch(`${process.env.backurl}/api/sportSubTypes/${context.params.id}`);
    const data = await res.json();
    return {
        props : { sportSubType: data }
    }
}