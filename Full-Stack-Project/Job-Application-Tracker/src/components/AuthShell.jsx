function AuthShell({

title,

subtitle,

image,

children

}){

return(

<div className="auth-shell">

<div className="auth-left">

<div className="gradient-overlay"></div>

<div className="floating-card card-one">

📄 Resume Ready

</div>

<div className="floating-card card-two">

🎯 Dream Company

</div>

<img

src={image}

alt="career"

className="auth-image"

/>

<div className="auth-text">

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

export default AuthShell;