import { useState } from "react";

function EditProfileModal({ profile, setProfile, closeModal }) {

    const [formData, setFormData] = useState(profile);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function saveProfile() {

        setProfile(formData);

        localStorage.setItem(
            "profile",
            JSON.stringify(formData)
        );

        closeModal();

    }

    return (

        <div
            className="modal-overlay"
            onClick={closeModal}
        >

            <div
                className="edit-profile-modal"
                onClick={(e) => e.stopPropagation()}
            >

                <h2>Edit Profile</h2>

                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                />

                <input
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Role"
                />

                <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                />

                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />

                <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    placeholder="About Yourself"
                />

                <textarea
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    placeholder="Career Goal"
                />

                <div className="modal-buttons">

                    <button
                        className="cancel-btn"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>

                    <button
                        className="save-btn"
                        onClick={saveProfile}
                    >
                        Save
                    </button>

                </div>

            </div>

        </div>

    );

}

export default EditProfileModal;