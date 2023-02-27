import Link from 'next/link'
import styles from '../src/styles/Home.module.css'

const Navbar = () => {
    return (
        // <nav>
        //     <div className="logo">
        //         <Image src="/logo.jpg" alt="logo" width={128} height={128}/>
        //     </div>
        //     <Link href="/" legacyBehavior><a>Home</a></Link>
        //     <Link href="/SportTypes" legacyBehavior><a>Sport Types</a></Link>
        // </nav>
    <div className={styles.container}>
      <main>
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
                    <Link href="/SportTypes" legacyBehavior><a className="nav-link">Sport Types</a></Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </main>
    </div>
    );
}
 
export default Navbar;