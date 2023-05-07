import Link from 'next/link'

const NotFound = () => {

    return (
        <div className="not-found">
            <h1>Oooops...</h1>
            <h2>This Page cannot be FOUND !</h2>
            <p>Go back to the <Link href="/" legacyBehavior><a>Home Page</a></Link></p>
        </div>
    );
}
 
export default NotFound;