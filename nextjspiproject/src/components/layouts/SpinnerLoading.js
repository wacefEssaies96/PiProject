import Spinner from 'react-bootstrap/Spinner';

export default function SpinnerLoading() {
    return (
        <div className="text-center">
            <Spinner style={{ width: '2rem', height: '2rem' }} animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}