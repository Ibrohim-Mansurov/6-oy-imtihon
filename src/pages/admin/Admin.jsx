import { useEffect, useRef, useState } from "react";
import SignOut from "../../SignOut";
import { Outlet, NavLink } from "react-router-dom";
import { instance } from "../../api";
import user__img from "../../images/user.svg";

const Admin = () => {
  const [user, setUser] = useState(null);
  const modelRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

    const fetchData = async () => {
      const { data } = await instance.get("/api/users/" + user_id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.data);
      console.log(data.data);
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="admin__container">
        <div className="dashboart">
          <h1 className="dash__text">Dashboard</h1>
          <div className="user">
            <img className="user__img" src={user__img} alt="" />
            <div className="user__info">
              <h2 className="user__name">{user?.fullname}</h2>
              <p className="user__role">{user?.role}</p>
            </div>
          </div>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active create__link" : "create__link"
            }
            to={"/admin/create"}
          >
            Create Post
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active manage__link" : "manage__link"
            }
            to={"/admin/manage"}
          >
            Manage Posts
          </NavLink>
          <button
            className="sign__out-btn"
            onClick={() => {
              modelRef.current.openModal();
            }}
          >
            Sign Out?
          </button>
        </div>
        <Outlet />
      </div>
      <SignOut ref={modelRef} />
    </>
  );
};

export default Admin;
