import Spinner from 'react-bootstrap/Spinner';

export default function PageSpinnerLoading() {
    return (
        <div className="text-center">
            <Spinner style={{ position: 'absolute', width: '5rem', height: '5rem', margin: '200px auto auto auto' }} animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}