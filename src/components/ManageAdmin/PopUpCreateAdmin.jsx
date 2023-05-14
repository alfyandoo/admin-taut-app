import Swal from "sweetalert2";
import { createAdmin } from "../../utils/api";
import { useState } from "react";

export const PopUpCreateAdmin = ({ setPopUpCreateAdmin, getAllAdmin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAdmin = async (newAdmin) => {
    const { error, messages } = await createAdmin(newAdmin);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        html: `${messages}`,
        confirmButtonText: "OK",
        showCancelButton: false,
      });
    }

    if (!error) {
      Swal.fire({
        icon: "success",
        title: "Success",
        html: `${messages}`,
        confirmButtonText: "OK",
        showCancelButton: false,
      });
      await getAllAdmin();
      setPopUpCreateAdmin(false);
    }
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-[60] bg-black/50"
      onClick={() => setPopUpCreateAdmin(false)}
    >
      <div
        className="bg-white rounded-md w-[500px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="flex border-b border-black/90 items-center justify-between py-2 px-5">
          <h1>Create Admin</h1>
          <button
            onClick={() => {
              setPopUpCreateAdmin(false);
            }}
          >
            <span>
              <svg
                width="25"
                height="25"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black hover:text-gray-300"
              >
                <path
                  d="M9.33332 27.7084L7.29166 25.6667L15.4583 17.5001L7.29166 9.33341L9.33332 7.29175L17.5 15.4584L25.6667 7.29175L27.7083 9.33341L19.5417 17.5001L27.7083 25.6667L25.6667 27.7084L17.5 19.5417L9.33332 27.7084Z"
                  fill="black"
                />
              </svg>
            </span>
          </button>
        </div>

        <div className="flex flex-col my-5 space-y-3">
          <div className="flex justify-center items-center">
            <form
              className="w-full mx-6"
              onSubmit={(event) => {
                event.preventDefault();
                handleCreateAdmin({
                  username,
                  password,
                });
              }}
            >
              <div className="mb-5">
                <label htmlFor="username">Username</label>
                <input
                  className="w-full px-3 py-2 bg-white border border-taut-blue-100 rounded-md focus:outline-none focus:shadow-outline"
                  id="username"
                  type="username"
                  placeholder="Username admin..."
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                  required
                />
              </div>

              <div className="mb-5">
                <label htmlFor="password">Password</label>
                <input
                  className="w-full px-3 py-2 bg-white border border-taut-blue-100 rounded-md focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password admin..."
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
