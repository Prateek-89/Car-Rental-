import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Login = () => {
  const { setShowLogin, axios, setToken, setIsOwner, navigate, setUser } = useAppContext();

  const [state, setState] = useState("login"); // "login" or "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const payload =
        state === "register" ? { name, email, password } : { email, password };

      const { data } = await axios.post(`/api/user/${state}`, payload);

      if (data.success) {
        setToken(data.token);
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        if (data.user) {
          setUser(data.user);
          setIsOwner(data.user.role === "owner");
        }

        setShowLogin(false);
        navigate("/");
        toast.success(
          state === "register"
            ? "Registered successfully!"
            : "Logged in successfully!"
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-[100] flex items-center bg-black/50"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto p-8 w-80 sm:w-[352px] bg-white rounded-lg shadow-xl"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <input
            type="text"
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded"
          />
        )}

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded"
        />

        <p
          className="text-sm cursor-pointer"
          onClick={() =>
            setState(state === "login" ? "register" : "login")
          }
        >
          {state === "login"
            ? "Create an account?"
            : "Already have an account?"}
        </p>

        <button type="submit" className="bg-primary text-white py-2 rounded">
          {state === "register" ? "Register" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
