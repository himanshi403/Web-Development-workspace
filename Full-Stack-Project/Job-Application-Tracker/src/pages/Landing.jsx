import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Landing() {

    return (
        

        <div className="landing-page">

           <>
<nav className="landing-navbar">

    <div className="logo">

        💼 JobTracker

    </div>

    <div className="nav-links">

        <a href="#features">Features</a>

        <a href="#about">About</a>

        <a href="#contact">Contact</a>

    </div>

    <div className="nav-buttons">

        <Link
            to="/login"
            className="login-nav-btn"
        >
            Login
        </Link>

        <Link
            to="/signup"
            className="signup-nav-btn"
        >
            Sign Up
        </Link>

    </div>

</nav>

<section className="hero">

    <div className="hero-left">

        <h1>

            Track Every Job,
            <br />

            Land Your Dream Career.

        </h1>

        <p>

            Keep every application,
            interview,
            offer and rejection
            beautifully organized in one place.

        </p>

        <Link
            to="/signup"
            className="hero-btn"
        >
            Get Started
        </Link>

    </div>

    <div className="hero-right">

        💼📊🚀

    </div>

</section>
</>
            <section 
            id="features"
            className="features">

                <div className="feature-card">

                    <h2>📋</h2>

                    <h3>Track Jobs</h3>

                    <p>

                        Save every application in one place.

                    </p>

                </div>

                <div className="feature-card">

                    <h2>📊</h2>

                    <h3>Analytics</h3>

                    <p>

                        Understand your job search using charts.

                    </p>

                </div>

                <div className="feature-card">

                    <h2>🎯</h2>

                    <h3>Stay Organized</h3>

                    <p>

                        Never lose track of interviews.

                    </p>

                </div>

            </section>

            <section className="stats-section">

    <div className="stat-card">

        <h2>10,000+</h2>

        <p>Applications Tracked</p>

    </div>

    <div className="stat-card">

        <h2>500+</h2>

        <p>Students Using JobTracker</p>

    </div>

    <div className="stat-card">

        <h2>95%</h2>

        <p>Stay Organized</p>

    </div>

    <div className="stat-card">

        <h2>24/7</h2>

        <p>Available Anytime</p>

    </div>

</section>

<section className="testimonials">

    <h2>What Our Users Say</h2>

    <div className="testimonial-container">

        <div className="testimonial-card">
            <h3>⭐ Priya Sharma</h3>
            <p>
                "JobTracker helped me organize more than
                120 applications during placements."
            </p>
        </div>

        <div className="testimonial-card">
            <h3>⭐ Rahul Verma</h3>
            <p>
                "The analytics showed where I was
                getting rejected and helped me improve."
            </p>
        </div>

        <div className="testimonial-card">
            <h3>⭐ Aditi Gupta</h3>
            <p>
                "Finally a clean dashboard for managing
                interviews and offers."
            </p>
        </div>

    </div>

</section>
<Footer />

        </div>

    );

}

export default Landing;