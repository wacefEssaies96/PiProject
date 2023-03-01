import Link from 'next/link'
import styles from '../src/styles/Home.module.css'

const Navbar = () => {
    return (
    <div className={styles.container}>
      {/* <main>
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Sport Types Section
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <Link href="/" legacyBehavior><a className="nav-link active" aria-current="page">Home</a></Link>
                </li>
                <li className="nav-item">
                    <Link href="/Front-Office" legacyBehavior><a className="nav-link">Sport Types</a></Link>
                </li>
                <li className="nav-item">
                    <Link href="/Back-Office" legacyBehavior><a className="nav-link">Admin</a></Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle"><Link href="/Back-Office" role="button" data-bs-toggle="dropdown" aria-expanded="false" legacyBehavior>
                  Admin
                  </Link></a>
                  <ul className="dropdown-menu">
                    <li><Link href="/Back-Office" legacyBehavior><a className="dropdown-item">Sport Type</a></Link></li>
                    <li><Link href="/Back-Office" legacyBehavior><a className="dropdown-item">Sport Sub Type</a></Link></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><Link href="#" legacyBehavior><a className="dropdown-item">Something else here</a></Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </main> */}

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Sport Types Section</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
          <Link href="/" legacyBehavior><a className="nav-link active" aria-current="page">Home</a></Link>
        </li>
        <li className="nav-item">
          {/* <a className="nav-link" href="#">Sport Types</a> */}
          <Link href="/Front-Office" legacyBehavior><a className="nav-link">Sport Types</a></Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Admin
          </a>
          <ul className="dropdown-menu">
            <li>
              {/* <a className="dropdown-item" href="#">Action</a> */}
              <Link href="/Back-Office" legacyBehavior><a className="dropdown-item">Sport Type</a></Link>
              </li>
            <li>
              {/* <a className="dropdown-item" href="#">Another action</a> */}
              <Link href="/Back-Office-SubType" legacyBehavior><a className="dropdown-item">Sport Sub Type</a></Link>
            </li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled">Disabled</a>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    </div>
    );
}
 
export default Navbar;