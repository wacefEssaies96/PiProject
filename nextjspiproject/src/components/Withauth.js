import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Function to check if the user is authenticated
function checkAuth(cookieString) {
  // Parse the cookie string into an object
  const cookieObj = cookieString
    .split(';')
    .reduce((acc, cookie) => {
      const [name, value] = cookie.trim().split('=');
      return { ...acc, [name]: value };
    }, {});

  // Check if the authentication cookie exists and is not expired
  const authToken = cookieObj.authToken;
  const expiry = parseInt(cookieObj.authExpiry);
  return authToken && expiry && expiry > Date.now();
}

function withAuth(WrappedComponent) {
  return (props) => {
    const router = useRouter();
 console.log("22");
    useEffect(() => {
      // Check if the user is authenticated
      const authenticated = checkAuth(document.cookie);
      // Redirect to the login page if not authenticated
      if (!authenticated) {
        router.push('/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
