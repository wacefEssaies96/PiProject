import Spinner from 'react-bootstrap/Spinner';

export default function PageSpinnerLoading() {
    // , margin: '200px 45% auto 45%' 
    return (
        <div className="text-center">
            <Spinner style={{display:'block', position:"fixed", width: '6rem', height: '6rem', top: '250px', right:'47%'}} animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}