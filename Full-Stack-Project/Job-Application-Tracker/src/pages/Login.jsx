import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthShell from "../components/AuthShell";
import career from "../assets/career.svg";

function Login(){

const navigate=useNavigate();

const[showPassword,setShowPassword]=useState(false);

return(

<AuthShell

title="Welcome Back 👋"

subtitle="Continue your journey toward your dream job."

image={career}

>

<div className="auth-card">

<h2>Login</h2>

<div className="input-group">

<span>📧</span>

<input

type="email"

placeholder="Email"

/>

</div>

<div className="input-group">

<span>🔒</span>

<input

type={showPassword?"text":"password"}

placeholder="Password"

/>

</div>

<button

className="show-password-btn"

onClick={()=>setShowPassword(!showPassword)}

>

{showPassword?"Hide":"Show"} Password

</button>

<button

className="login-btn"

onClick={()=>navigate("/dashboard")}

>

Login

</button>

<div className="divider">

<span>OR</span>

</div>

<button className="social-btn">

Continue with Google

</button>

<p>

Don't have an account?

<Link to="/signup">

Signup

</Link>

</p>

</div>

</AuthShell>

);

}

export default Login;