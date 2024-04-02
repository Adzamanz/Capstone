import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { clearTransactions } from "../../store/transactions";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    // window.location.reload()
    dispatch(logout());
    dispatch(clearTransactions())
    history.push('')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? " revealed" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="profile_main">
      <div className='profile_button clickable' onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </div>
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div>
            <div>- {user.username}</div>
            <div>-   {user.email}</div>
            <div>
              <div className="log_out_button" onClick={handleLogout}>Log Out</div>
            </div>
          </div>
        ) : (
          <div className="logged_out_menu">
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
