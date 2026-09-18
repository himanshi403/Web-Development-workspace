import {
    useState,
    useRef,
    useEffect
} from "react";

import {
    useNavigate
} from "react-router-dom";

function ProfileMenu() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const menuRef = useRef(null);

    const [user, setUser] = useState(() => {
        try {
            const storedUser =
                localStorage.getItem("user");

            return storedUser
                ? JSON.parse(storedUser)
                : null;

        } catch {
            return null;
        }
    });


    useEffect(() => {

        function handleClickOutside(event) {

            if (
                menuRef.current &&
                !menuRef.current.contains(
                    event.target
                )
            ) {

                setOpen(false);

            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    useEffect(() => {

        const updateUser = () => {

            try {

                const storedUser =
                    localStorage.getItem("user");

                setUser(
                    storedUser
                        ? JSON.parse(storedUser)
                        : null
                );

            } catch {

                setUser(null);

            }

        };


        window.addEventListener(
            "authChange",
            updateUser
        );

        return () => {

            window.removeEventListener(
                "authChange",
                updateUser
            );

        };

    }, []);


    const getInitials = (name = "") => {

        return name
            .trim()
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map(
                word =>
                    word[0].toUpperCase()
            )
            .join("");

    };


    return (

        <div
            className="profile-menu"
            ref={menuRef}
        >

            <div
                className="navbar-avatar"
                onClick={() =>
                    setOpen(!open)
                }
            >

                {user?.profileImage ? (

                    <img
                        src={user.profileImage}
                        alt={user?.name || "Profile"}
                    />

                ) : (

                    getInitials(
                        user?.name || "User"
                    )

                )}

            </div>


            {open && (

                <div className="dropdown-menu">

                    <p
                        onClick={() =>
                            navigate("/profile")
                        }
                    >
                        My Profile
                    </p>


                    <p
                        onClick={() =>
                            navigate("/settings")
                        }
                    >
                        Settings
                    </p>


                    <p
                        onClick={() => {

                            localStorage.removeItem(
                                "token"
                            );

                            localStorage.removeItem(
                                "user"
                            );

                            window.dispatchEvent(
                                new Event(
                                    "authChange"
                                )
                            );

                            navigate("/");

                        }}
                    >
                        Logout
                    </p>

                </div>

            )}

        </div>

    );

}

export default ProfileMenu;