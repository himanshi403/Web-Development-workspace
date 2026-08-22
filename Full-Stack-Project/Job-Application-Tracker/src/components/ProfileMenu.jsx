import {useState,useRef,useEffect} from "react";
import { useNavigate } from "react-router-dom";
function ProfileMenu(){
    const navigate = useNavigate();
    const[open,setOpen]=useState(false);
    const menuRef = useRef(null);

    useEffect(() => {

    function handleClickOutside(event) {

        if (
            menuRef.current &&
            !menuRef.current.contains(event.target)
        ) {

            setOpen(false);

        }

    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {

        document.removeEventListener(
            "mousedown",
            handleClickOutside
        );

    };

}, []);

    return(
        <div className="profile-menu" ref={menuRef}>
            <div className="navbar-avatar"
            onClick={()=>setOpen(!open)}>
                HP
            </div>

            {
                open &&
               <div className="dropdown-menu">

<p onClick={() => navigate("/profile")}>

My Profile

</p>

<p onClick={() => navigate("/settings")}>

Settings

</p>

<p
    onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");
    }}
>
    Logout
</p>

</div>
            }
        </div>
    );
}
export default ProfileMenu;