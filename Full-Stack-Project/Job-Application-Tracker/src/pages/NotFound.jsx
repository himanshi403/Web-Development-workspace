import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div className="not-found-page">

            <h1>404</h1>

            <h2>Page Not Found</h2>

            <p>

                Looks like this page doesn't exist.

            </p>

            <Link
                to="/dashboard"
                className="back-home-btn"
            >

                Back to Dashboard

            </Link>

        </div>

    );

}

export default NotFound;