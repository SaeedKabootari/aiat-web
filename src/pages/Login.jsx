import { useState } from "react";
import loginBg from "../assets/bg.png";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../context/WebSocketContext";
import { useAuth } from "../context/AuthContext";
import { postActionAx } from "../api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { connect } = useWebSocket();
  const { login } = useAuth();

  const loginHandler = async (event) => {
    event.preventDefault();

    await postActionAx("/api/login", {
      username: username,
      password: password,
    })
      .then((res) => {
        console.log(res.data.access_token);
        connect();
        login(res.data.access_token);
        navigate("/discovering-contradiction");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="w-full max-w-md p-8  rounded-lg shadow-lg border border-[#A0A0A0] mx-4 backdrop-blur-lg bg-white/20">
        <form className="space-y-6" onSubmit={loginHandler}>
          <div className="flex justify-center">
            <h1 className="text-3xl text-[#fff] font-semiboldold">
              Welcome To Diar
            </h1>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-[#E0E0E0] mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-[#fff]"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#fff] mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-[#fff]"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-white font-medium rounded-lg transition-all duration-300
            bg-[#242752] hover:bg-[#303874] 
            focus:outline-none focus:ring-2 focus:ring-[#3e4a8a] focus:ring-offset-2
            shadow-md hover:shadow-lg active:scale-[0.98]
            relative overflow-hidden group cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
