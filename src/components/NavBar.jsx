import { Link } from "react-router-dom";
import Modal from "react-modal";
import { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

export default function NavBar({ user, setToken, setUser }) {
  const [singupIsOpen, setSignupIsOpen] = useState(false);
  const [singinIsOpen, setSigninIsOpen] = useState(false);

  function handleLogout() {
    setToken("");
    setUser({});
    localStorage.removeItem("token");
    closeSigninModal();
  }

  //Handles Modal Visibility
  function openSignupModal() {
    setSignupIsOpen(true);
  }

  function closeSignupModal() {
    setSignupIsOpen(false);
  }

  function openSigninModal() {
    setSigninIsOpen(true);
  }

  function closeSigninModal() {
    setSigninIsOpen(false);
  }

  return (
    <div id="navbar">
      {" "}
      <div id="navbar-content">
        <Link to={"/"}>Home</Link>

        <div className="search-bar">
          {/* Add your search input field here */}
          <input type="text" placeholder="Search..." />
          {/* Add your search button here */}
          <button>Search</button>
        </div>

        {/* Checks if there is a signed in user, if not displays signup/login */}
        {!user.id ? (
          <>
            {/* Opens Sign up Modal */}
            <Link onClick={openSignupModal}>Sign Up</Link>
            <Modal
              ariaHideApp={false}
              className="modal-overlay"
              isOpen={singupIsOpen}
              onRequestClose={closeSignupModal}
              contentLabel="Example Modal"
            >
              <SignUp closeSignupModal={closeSignupModal} setToken={setToken} />
            </Modal>
            {/* Opens Sign in Modal */}
            <Link onClick={openSigninModal}>Login</Link>
            <Modal
              ariaHideApp={false}
              className="modal-overlay"
              isOpen={singinIsOpen}
              onRequestClose={closeSigninModal}
              contentLabel="Example Modal"
            >
              <Login closeSigninModal={closeSigninModal} setToken={setToken} />
            </Modal>
          </>
        ) : (
          <>
            <span>Welcome {user.username}</span>
            <Link onClick={handleLogout} to={"/"}>
              Logout
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
