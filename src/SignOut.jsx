import Cansel from "./images/Cancel.svg";
import { useImperativeHandle, useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./SignOut.css";
const SignOut = (props, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    openModal: () => setIsModalOpen(true),
  }));
  const handleLogOut = () => {
    setLoading(true);
    localStorage.removeItem("token");
    toast.success("You logged in successfully");
    setIsModalOpen(false);
    setLoading(false);
    navigate("/");
  };

  if (!isModalOpen) return null;
  return (
    <>
      <div className="overlar"></div>
      <div className="modal">
        <button className="cansel__btn" onClick={() => setIsModalOpen(false)}>
          {" "}
          <img src={Cansel} alt="" />
        </button>
        <h1 className="modal__text">Sign Out?</h1>
        <h2 className="modal__text2">Do you want to Sign Out? Really?</h2>
        <button onClick={handleLogOut} className="sign-out__btn">
          {loading ? "Loading..." : "Sign Out"}
        </button>
      </div>
    </>
  );
};

export default forwardRef(SignOut);
