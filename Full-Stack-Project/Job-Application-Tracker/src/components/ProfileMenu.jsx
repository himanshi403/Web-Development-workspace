import {useState} from "react";
function ProfileMenu(){
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
                    <p>My Profile</p>

<p>Settings</p>

<p>Logout</p>

</div>
            }
        </div>
    );
}
export default ProfileMenu;