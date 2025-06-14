import Header from '../header/header';
import Footer from '../footer/footer.jsx';
import './notFound.css';

const notFound = () => {

    return (
        <div>
            <Header />
            <div className="container404">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Sorry, the page you are looking for does not exist.</p>
                <a href="/">Go to home</a>
            </div>
            <Footer />
        </div>
    )
}

export default notFound;