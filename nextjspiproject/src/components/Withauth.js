import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';


function withAuth(WrappedComponent) {
  
const cookies = new Cookies();

  return (props) => {
    const router = useRouter();
    useEffect(() => {
      if (window.location.pathname.includes('login') && cookies.get('user')) {
        router.push('/');
      }
    //   else {
    //     if (window.location.pathname.includes('admin') && cookies.get('user').role !== 'ADMIN') {
    //       window.location = '/'
    //     }
    //     if (window.location.pathname.includes('doctor') && cookies.get('user').role !== 'DOCTOR') {
    //       window.location = '/'
    //     }
    //     if (window.location.pathname.includes('editProfile') && cookies.get('user').role === 'DOCTOR') {
    //       window.location = '/'
    //     }
    //   }
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
