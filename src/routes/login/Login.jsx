import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { instance } from "../../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginUser = (e) => {
    e.preventDefault();
    setLoading(true);
    instance
      .post("/api/auth/login", {
        email,
        password,
      })
      .then((response) => {
        toast.success("You logged in successfully");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.data._id);
        navigate("/");
        console.log(response);
      })
      .catch((error) => {
        toast.error("You logged in unsuccessfully");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        setEmail("");
        setPassword("");
      });
  };

  return (
    <>
      <div className="login__div" onSubmit={handleLoginUser}>
        <div className="logo">
          <h2>Ibrohim</h2>
        </div>
        <p className="login__text2">Login</p>
        <form>
          <input
            className="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password__wrapper item">
            <input
              type={isVisiblePassword ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isVisiblePassword ? (
              <FiEye onClick={() => setIsVisiblePassword(false)} />
            ) : (
              <FiEyeOff onClick={() => setIsVisiblePassword(true)} />
            )}
          </div>
          <p className="dont">
            Dont you have an account?{" "}
            <Link className="signup__text" to="/auth/signup">
              Sign up.
            </Link>
          </p>
          <button className="login__btn" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
