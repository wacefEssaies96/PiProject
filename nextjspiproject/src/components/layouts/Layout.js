import Footer from "../UserTemplate/Footer";
import Header from "../UserTemplate/Header";

const Layout = ({ children }) => {
    return (
        <div className="content">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default Layout;