import Link from 'next/link'
import { useEffect } from 'react';
import { useRouter } from 'next/router'

const NotFound = () => {

    //initialise the useRouter hook which contains a method to redirect
    const router = useRouter();

    //Redirection the user automaticlly after 3 seconds to the home page
    useEffect(()=> {
        setTimeout(()=> {
            router.push('/');
        }, 3000)
    }, [])

    return (
        <div className="not-found">
            <h1>Oooops...</h1>
            <h2>This Page cannot be FOUND !</h2>
            <p>Go back to the <Link href="/" legacyBehavior><a>Home Page</a></Link></p>
        </div>
    );
}
 
export default NotFound;