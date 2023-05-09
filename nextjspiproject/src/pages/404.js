import Link from 'next/link'

const NotFound = () => {

    return (
        <div className="not-found">
            <h1>Oooops...</h1>
            <h2>This Page cannot be FOUND !</h2>
            <p><Link href="/" legacyBehavior><a>Home Page</a></Link></p>
            <p>  <Link href="/auth/login" legacyBehavior><a>Login Page</a></Link></p>
        </div>
    );
}
 
export default NotFound;