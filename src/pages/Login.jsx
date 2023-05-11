import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BASE_URL } from "../api/api";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import Swal from "sweetalert2";

export const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await fetch(`${BASE_URL}/admins/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (data.messages === "username atau password salah") {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          html: `username atau password salah`,
          confirmButtonText: "OK",
          showCancelButton: false,
        });
      }

      if (data.messages.includes("success login")) {
        localStorage.setItem("token-admin", data.token);
        setAuth(data);
        navigate("/");
      }
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center mx-auto">
        <div className="flex w-full justify-center items-center mx-auto">
          <img
            src="/images/icon-taut.png"
            alt="login_image"
            className="w-[400px] mt-10 mb-20"
          />
        </div>

        <div className="flex flex-col items-center w-full h-fit">
          <h2 className="font-bold mx-auto mb-2">ADMIN</h2>
          <input
            type="text"
            className="border-2 rounded-lg px-2 mb-3 py-4"
            placeholder="Input username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="border-2 rounded-lg px-2 w-full mb-3 py-4"
              placeholder="Input password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword((prevState) => !prevState)}
                className="absolute cursor-pointer text-xl top-3 right-4 bottom-40 translate-y-1/2 text-gray-300 hover:text-gray-200"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword((prevState) => !prevState)}
                className="absolute cursor-pointer text-xl top-3 right-4 bottom-40 translate-y-1/2 text-gray-300 hover:text-gray-200"
              />
            )}
          </div>
          <button
            className="my-3 px-20 py-3 rounded-lg text-white bg-blue-400 hover:bg-blue-300"
            onClick={() => login()}
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
};
