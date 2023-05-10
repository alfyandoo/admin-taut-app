import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContexts";

export const Menu = () => {
  const { setAuth } = useContext(AuthContext);
  const [activeMenu, setActiveMenu] = useState("Beranda");
  
  const menus = [
    {
      title: "Beranda",
      href: "/",
    },
    {
      title: "List Admin",
      href: "/manage-admin",
    },
    {
      title: "List User",
      href: "/manage-user",
    },
    {
      title: "Insert Excel",
      href: "/insert-excel",
    },
  ];

  const Logout = () => {
    localStorage.removeItem("token-admin");
    setAuth(null);
    window.location.href = "/login";
  };

  return (
    <div className="h-screen bg-gray-300">
      <div className="flex justify-center mb-3">
        <img
          src="/images/icon-taut.png"
          alt="logo"
          className="m-2 w-40 mb-24 mt-10 rounded-xl"
        />
      </div>
      {menus.map((item, index) => (
        <div key={index} className="flex mx-5 mb-3">
          <Link
            onClick={() => setActiveMenu(item.title)}
            to={item.href}
            className={`w-full px-5 py-3 rounded-xl text-white bg-blue-400 hover:bg-blue-800/90 ${
              activeMenu === item.title ? "font-bold text-lg bg-blue-800" : ""
            }`}
          >
            {item.title}
          </Link>
        </div>
      ))}
      <div className="m-5 fixed bottom-2">
        <button
          className="px-5 py-2 rounded-xl bg-white border text-red-600 border-red-600 hover:text-white hover:bg-red-600"
          onClick={() => Logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
