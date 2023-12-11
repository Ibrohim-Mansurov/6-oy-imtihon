import { useEffect, useState } from "react";
import { instance } from "../../api";
import { toast } from "react-toastify";

const Create = () => {
  const [categories, setCategories] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postImage, setPostImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await instance.get("/api/categories");
      setCategories(data.data);
    };
    fetchData();
  }, []);

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const postData = {
        title: postTitle,
        image: postImage,
        category: selectedCategory,
        description: postDescription,
      };
      const response = await instance.post("/api/posts", postData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      toast.success("Post created successfully");
      setPostTitle("");
      setPostImage("");
      setSelectedCategory("");
      setPostDescription("");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="create__post">
        <h2 className="create__text">Create New Post</h2>
        <div className="hr"></div>
        <p className="create__title">Post title</p>
        <input
          className="create__input"
          type="text"
          placeholder="Post title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <p className="create__img-text">Post image</p>
        <input
          className="create__input-img"
          type="text"
          placeholder="Post image"
          value={postImage}
          onChange={(e) => setPostImage(e.target.value)}
        />
        <select
          className="create__category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option disabled value="">
            Select post category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
        <p className="create__desc-text">Post description</p>
        <input
          type="text"
          placeholder="Post description"
          className="create__input-description"
          value={postDescription}
          onChange={(e) => setPostDescription(e.target.value)}
        />
        <button className="create__btn" onClick={handleCreatePost}>
          {loading ? "Loading..." : "Create Post"}
        </button>
      </div>
    </>
  );
};

export default Create;
