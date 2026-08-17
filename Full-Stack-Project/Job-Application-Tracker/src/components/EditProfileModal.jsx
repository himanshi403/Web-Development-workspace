import { useState } from "react";

function EditProfileModal({
    profile,
    setProfile,
    updateProfile,
    closeModal
}) {

    const [formData, setFormData] = useState({
        name: profile.name || "",
        role: profile.role || "",
        location: profile.location || "",
        email: profile.email || "",
        about: profile.about || "",
        goal: profile.goal || ""
    });

    const [saving, setSaving] = useState(false);

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }


    async function saveProfile() {

        if (!formData.name.trim()) {
            alert("Name is required");
            return;
        }

        try {

            setSaving(true);

            const updatedProfile =
                await updateProfile(formData);

            setProfile(updatedProfile);

            closeModal();

        } catch (error) {

            console.error(
                "Profile update failed:",
                error
            );

            alert("Failed to update profile");

        } finally {

            setSaving(false);

        }

    }


    return (

        <div
            className="modal-overlay"
            onClick={closeModal}
        >

            <div
                className="edit-profile-modal"
                onClick={(e) =>
                    e.stopPropagation()
                }
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
                    type="email"
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
                        disabled={saving}
                    >
                        Cancel
                    </button>


                    <button
                        className="save-btn"
                        onClick={saveProfile}
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : "Save"}
                    </button>

                </div>

            </div>

        </div>

    );

}

export default EditProfileModal;