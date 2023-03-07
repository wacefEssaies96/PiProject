import Link from 'next/link'
import styles from '../../styles/Home.module.css'

const Navbar = () => {
    return (
    <div className={styles.container}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Sport Types Section</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/" legacyBehavior><a className="nav-link active" aria-current="page">Home</a></Link>
              </li>
              <li className="nav-item">
                <Link href="/client" legacyBehavior><a className="nav-link">Client</a></Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Admin
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link href="/admin/sport-type" legacyBehavior><a className="dropdown-item">Sport Type</a></Link>
                    </li>
                  <li>
                    <Link href="/admin/sport-sub-type" legacyBehavior><a className="dropdown-item">Sport Sub Type</a></Link>
                  </li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    );
}
 
export default Navbar;