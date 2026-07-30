function AuthLayout({ title, subtitle, children }){
    return(
        <div className="auth-layout">
            <div className="auth-left">
                <div className="auth-content">
                    <h1>{title}</h1>

                    <p>{subtitle}</p>
                </div>
            </div>
            <div className="auth-right">

                {children}

            </div>
        </div>
    );
}

export default AuthLayout;