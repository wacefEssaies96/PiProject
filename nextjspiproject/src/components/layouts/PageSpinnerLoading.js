import Spinner from 'react-bootstrap/Spinner';

export default function PageSpinnerLoading() {
    return (
        <div className="text-center">
            <Spinner style={{display:'block', position:"fixed", width: '6rem', height: '6rem', margin: '200px 35% auto 35%' }} animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}