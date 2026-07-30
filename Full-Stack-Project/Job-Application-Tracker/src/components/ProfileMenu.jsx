import {useState} from "react";
import { useNavigate } from "react-router-dom";
function ProfileMenu(){
    const navigate = useNavigate();
    const[open,setOpen]=useState(false);
    return(
        <div className="profile-menu">
            <div className="profile-avatar"
            onClick={()=>setOpen(!open)}>
                👤
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

<p onClick={() => navigate("/")}>

Logout

</p>

</div>
            }
        </div>
    );
}
export default ProfileMenu;