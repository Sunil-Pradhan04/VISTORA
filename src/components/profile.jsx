import { useState, useEffect, useRef } from "react";
import "./styles/profile.css";

const Profile = () => {
  const [name, setName] = useState(localStorage.getItem("userName") || "");
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [logo, setLogo] = useState(localStorage.getItem("logo") || "");
  const [isEditing, setIsEditing] = useState(false);

  const avatars = [
    "avatar1.jpg", "avater2.webp", "avatar3.jpeg", "avatar4.jpeg",
    "avatar5.jpg", "avatar6.jpeg", "avatar7.jpeg"
  ];

  const [logoIndex, setLogoIndex] = useState(avatars.indexOf(logo));
  const avatarsRef = useRef(null);

  const logout = () => {
    if (window.confirm("Do you really want to logout?")) {
      localStorage.setItem("login", "no");
      window.location.href = "/login";
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleAvatarSelect = (index, avatar) => {
    setLogoIndex(index);
    setLogo(avatar);
  };

  const saveChanges = () => {
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("logo", logo);
    setIsEditing(false);
  };

  // Auto-scroll avatars horizontally when editing
  useEffect(() => {
    if (!isEditing || !avatarsRef.current) return;

    const container = avatarsRef.current;
    const scrollStep = 1; // pixels per tick
    const delay = 20; // ms

    const scrollInterval = setInterval(() => {
      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += scrollStep;
      }
    }, delay);

    return () => clearInterval(scrollInterval);
  }, [isEditing]);

  return (
    <div className="profile">
      {isEditing ? (
        <div className="edit-profile">
          <div className="avatar-selection">
            <p className="choose-avatar">Choose your Avatar</p>
            <div className="logos-container" ref={avatarsRef}>
              <div className="logos">
                {avatars.map((avatar, index) => (
                  <div
                    key={index}
                    className={`pre-logo ${index === logoIndex ? "active3" : ""}`}
                    onClick={() => handleAvatarSelect(index, avatar)}
                    style={{ backgroundImage: `url(${avatar})` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="edit-fields">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
              className="edit-input"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="edit-input"
            />
          </div>

          <div className="edit-buttons">
            <button className="save-button" onClick={saveChanges}>
              Save
            </button>
            <button className="cancel-button" onClick={handleEdit}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="logo" style={{ backgroundImage: `url(${logo})` }}></div>
          <div className="edit" onClick={handleEdit}>
            Edit
          </div>
          <div className="user-name">{name}</div>
          <div className="user-email">{email}</div>
          <div className="exit" onClick={logout}>
            Logout
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;