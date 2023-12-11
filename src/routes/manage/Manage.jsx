import { useEffect, useState, useRef } from "react";
import { instance } from "../../api";
import Delete from "../../Delete";

const Manage = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("user_id");
  const modelRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await instance.get("/api/posts");
      setPosts(data.data);
      if (token && user_id) {
        const { data } = await instance.get("/api/users/" + user_id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data.data);
      }
    };
    fetchData();

    fetchData();
  }, [token, user_id]);

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 13) {
      return words.slice(0, 13).join(" ") + "...";
    }
    return description;
  };

  return (
    <>
      <div className="content">
        <h1 className="manage__text">Manage posts</h1>
        <div className="hr"></div>
        <div className="user__categiryes">
          {posts
            .filter((item) => item.author === user?._id)
            .map((post, index) => (
              <div key={index}>
                <Delete ref={modelRef} id={post._id} />
                <div className="category">
                  <img className="user__post-img" src={post.image} alt="" />
                  <h2 className="user__text">{post.title}</h2>
                  <p className="user__text2">
                    {truncateDescription(post.description)}
                  </p>
                  <button
                    className="delete__btn"
                    onClick={() => {
                      modelRef.current.openModal();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Manage;
