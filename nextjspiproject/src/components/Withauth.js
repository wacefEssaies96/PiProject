import NotFound from '@/pages/404';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';


function withAuth(WrappedComponent) {

  const cookies = new Cookies();

  return (props) => {
    const [show, setShow] = useState(true)
    useEffect(() => {
      
      if (window.location.pathname.includes('login') && cookies.get('user') && cookies.get('token')) {
        // window.location = '/'
        setShow(false)
      }
      else {
        if ( !cookies.get('user') && window.location.pathname.includes('admin') && window.location.pathname.includes('clinic') && cookies.get('user').role !== 'ADMIN') {
          // window.location = '/'
          setShow(false)
        }
        if (window.location.pathname.includes('doctor') && cookies.get('user').role !== 'DOCTOR') {
          // window.location = '/'
          setShow(false)
        }
        if (window.location.pathname.includes('editProfile') && cookies.get('user').role === 'DOCTOR') {
          // window.location = '/'
          setShow(false)
        }
      }
    }, []);
    if (show)
      return <WrappedComponent {...props} />;
    else
      return <NotFound></NotFound>
  };
}

export default withAuth;
