import { Link } from "react-router-dom";
import { useState } from "react";

import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";

function Landing() {

    const [showModal, setShowModal] = useState(false);

    return (

        <div className="landing-page">

            {/* ================= NAVBAR ================= */}

            <nav className="landing-navbar">

                <div className="landing-logo">

                    <div className="logo-icon">
                        💼
                    </div>

                    <span>
                        JobTracker
                    </span>

                </div>


                <div className="nav-links">

                    <a href="#features">
                        Features
                    </a>

                    <a href="#how-it-works">
                        How It Works
                    </a>

                    <a href="#testimonials">
                        Testimonials
                    </a>

                </div>


                <div className="nav-actions">

                    <button
                        className="nav-login"
                        onClick={() => setShowModal(true)}
                    >
                        Login
                    </button>


                    <Link
                        to="/signup"
                        className="signup-nav-btn"
                    >
                        Sign Up
                    </Link>

                </div>

            </nav>


            {/* ================= HERO ================= */}

            <section className="hero-section">

                <div className="hero-content">

                    <div className="hero-badge">

                        ✨ Your Career, Better Organized

                    </div>


                    <h1>

                        Stop Losing Track of

                        <span>
                            Your Career.
                        </span>

                    </h1>


                    <p>

                        JobTracker helps you organize applications,
                        interviews, offers and opportunities — all in
                        one beautiful workspace.

                    </p>


                    <div className="hero-actions">

                        <Link
                            to="/signup"
                            className="hero-btn"
                        >
                            Get Started Free
                            <span>→</span>
                        </Link>


                        <button
                            className="hero-login-btn"
                            onClick={() => setShowModal(true)}
                        >
                            Already have an account?
                        </button>

                    </div>


                    <div className="hero-trust">

                        <div className="avatar-group">

                            <span>👩🏻‍💻</span>
                            <span>👨🏻‍💻</span>
                            <span>👩🏽‍💼</span>
                            <span>👨🏾‍💻</span>

                        </div>

                        <p>

                            Helping job seekers stay organized

                        </p>

                    </div>

                </div>


                {/* HERO VISUAL */}

                <div className="hero-visual">

                    <div className="glow glow-one"></div>
                    <div className="glow glow-two"></div>


                    <div className="career-orbit">

                        <div className="orbit-center">

                            <div className="orbit-icon">
                                💼
                            </div>

                            <h3>
                                JobTracker
                            </h3>

                            <p>
                                Your Career Hub
                            </p>

                        </div>


                        <div className="floating-card card-one">

                            <span className="floating-icon">
                                📄
                            </span>

                            <div>

                                <strong>
                                    Applications
                                </strong>

                                <small>
                                    Stay organized
                                </small>

                            </div>

                        </div>


                        <div className="floating-card card-two">

                            <span className="floating-icon">
                                🎯
                            </span>

                            <div>

                                <strong>
                                    Interviews
                                </strong>

                                <small>
                                    Never miss one
                                </small>

                            </div>

                        </div>


                        <div className="floating-card card-three">

                            <span className="floating-icon">
                                🚀
                            </span>

                            <div>

                                <strong>
                                    Opportunities
                                </strong>

                                <small>
                                    Move forward
                                </small>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= FEATURES ================= */}

            <section
                id="features"
                className="features-section"
            >

                <div className="section-heading">

                    <span>
                        WHY JOBTRACKER
                    </span>

                    <h2>

                        Everything you need to stay
                        <br />

                        <span>
                            one step ahead.
                        </span>

                    </h2>

                    <p>

                        A simple place to manage your entire
                        job-search journey.

                    </p>

                </div>


                <div className="features-grid">


                    <div className="feature-card">

                        <div className="feature-icon purple">

                            📋

                        </div>

                        <h3>
                            Track Applications
                        </h3>

                        <p>

                            Keep every application organized
                            without spreadsheets or sticky notes.

                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon blue">

                            📊

                        </div>

                        <h3>
                            Smart Analytics
                        </h3>

                        <p>

                            Understand your job search and identify
                            where you can improve.

                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon pink">

                            📅

                        </div>

                        <h3>
                            Stay Prepared
                        </h3>

                        <p>

                            Organize interviews, deadlines and
                            important career opportunities.

                        </p>

                    </div>


                    <div className="feature-card">

                        <div className="feature-icon orange">

                            🔍

                        </div>

                        <h3>
                            Everything Together
                        </h3>

                        <p>

                            Applications, resumes and interview
                            information in one place.

                        </p>

                    </div>

                </div>

            </section>


            {/* ================= HOW IT WORKS ================= */}

            <section
                id="how-it-works"
                className="how-section"
            >

                <div className="section-heading">

                    <span>
                        SIMPLE & EASY
                    </span>

                    <h2>

                        Your job search,
                        <span>
                            simplified.
                        </span>

                    </h2>

                </div>


                <div className="steps-container">


                    <div className="step-card">

                        <div className="step-number">
                            01
                        </div>

                        <div className="step-icon">
                            ✍️
                        </div>

                        <h3>
                            Create Account
                        </h3>

                        <p>

                            Sign up and start building your
                            career workspace.

                        </p>

                    </div>


                    <div className="step-line"></div>


                    <div className="step-card">

                        <div className="step-number">
                            02
                        </div>

                        <div className="step-icon">
                            💼
                        </div>

                        <h3>
                            Add Opportunities
                        </h3>

                        <p>

                            Start organizing applications
                            and interviews.

                        </p>

                    </div>


                    <div className="step-line"></div>


                    <div className="step-card">

                        <div className="step-number">
                            03
                        </div>

                        <div className="step-icon">
                            🚀
                        </div>

                        <h3>
                            Move Forward
                        </h3>

                        <p>

                            Stay organized and focus on
                            landing your next opportunity.

                        </p>

                    </div>

                </div>

            </section>


            {/* ================= STATS ================= */}

            <section className="stats-section">

                <div className="stat-card">

                    <h2>
                        10K+
                    </h2>

                    <p>
                        Applications Organized
                    </p>

                </div>


                <div className="stat-card">

                    <h2>
                        500+
                    </h2>

                    <p>
                        Career Builders
                    </p>

                </div>


                <div className="stat-card">

                    <h2>
                        95%
                    </h2>

                    <p>
                        Stay More Organized
                    </p>

                </div>


                <div className="stat-card">

                    <h2>
                        24/7
                    </h2>

                    <p>
                        Available Anytime
                    </p>

                </div>

            </section>


            {/* ================= TESTIMONIALS ================= */}

            <section
                id="testimonials"
                className="testimonials-section"
            >

                <div className="section-heading">

                    <span>
                        COMMUNITY LOVE
                    </span>

                    <h2>

                        Built for people chasing
                        <span>
                            big opportunities.
                        </span>

                    </h2>

                </div>


                <div className="testimonial-container">


                    <div className="testimonial-card">

                        <div className="quote">
                            “
                        </div>

                        <p>

                            JobTracker helped me organize more
                            than 120 applications during my
                            placement season.

                        </p>

                        <div className="testimonial-user">

                            <div className="testimonial-avatar">

                                P

                            </div>

                            <div>

                                <h4>
                                    Priya Sharma
                                </h4>

                                <span>
                                    Student
                                </span>

                            </div>

                        </div>

                    </div>


                    <div className="testimonial-card featured-testimonial">

                        <div className="quote">
                            “
                        </div>

                        <p>

                            Having everything in one place
                            made my job search much less
                            stressful.

                        </p>

                        <div className="testimonial-user">

                            <div className="testimonial-avatar">

                                R

                            </div>

                            <div>

                                <h4>
                                    Rahul Verma
                                </h4>

                                <span>
                                    Job Seeker
                                </span>

                            </div>

                        </div>

                    </div>


                    <div className="testimonial-card">

                        <div className="quote">
                            “
                        </div>

                        <p>

                            Finally, a simple way to stay on
                            top of interviews, applications
                            and opportunities.

                        </p>

                        <div className="testimonial-user">

                            <div className="testimonial-avatar">

                                A

                            </div>

                            <div>

                                <h4>
                                    Aditi Gupta
                                </h4>

                                <span>
                                    Graduate
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= CTA ================= */}

            <section className="landing-cta">

                <div className="cta-glow"></div>

                <h2>

                    Your next opportunity could
                    <br />

                    <span>
                        change everything.
                    </span>

                </h2>


                <p>

                    Start organizing your career journey today.

                </p>


                <Link
                    to="/signup"
                    className="cta-btn"
                >

                    Start Using JobTracker
                    →

                </Link>

            </section>


            {/* ================= FOOTER ================= */}

            <div id="footer">

                <Footer />

            </div>


            {/* ================= LOGIN MODAL ================= */}

            {

                showModal &&

                <AuthModal

                    closeModal={() =>
                        setShowModal(false)
                    }

                />

            }

        </div>

    );

}

export default Landing;