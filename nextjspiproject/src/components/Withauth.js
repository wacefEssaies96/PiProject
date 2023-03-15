import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

function withAuth(WrappedComponent) {
  return (props) => {
    const router = useRouter();
    useEffect(() => {
      if (!cookies.get('user')) {
        router.push('/login');
      }
      else {
        if (window.location.pathname.includes('users') && cookies.get('user').role !== 'ADMIN') {
          window.location = '/'
        }
        if (window.location.pathname.includes('doctor') && cookies.get('user').role !== 'DOCTOR') {
          window.location = '/'
        }
        if (window.location.pathname.includes('editProfile') && cookies.get('user').role === 'DOCTOR') {
          window.location = '/'
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
