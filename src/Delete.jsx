import Cancel__img from "./images/Cancel.svg";
import "./Delete.css";
import { useState, useImperativeHandle, forwardRef } from "react";
import { instance } from "./api";

const Delete = ({ id }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: () => setIsModalOpen(true),
  }));

  const onDelete = async (id) => {
    const token = localStorage.getItem("token");
    console.log(token);
    await instance.put("/api/posts/" + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  if (!isModalOpen) return null;
  return (
    <>
      <div className="overlar2"></div>
      <div className="modal2">
        <button className="cansel__btn" onClick={() => setIsModalOpen(false)}>
          <img src={Cancel__img} alt="" />
        </button>
        <h1 className="modal__text">Delete Post</h1>
        <h2 className="modal__text2">Are you sure to delete this post?</h2>
        <button className="sign-out__btn" onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </>
  );
};

export default forwardRef(Delete);
