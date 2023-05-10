import { useMemo, useState } from "react";
import { AuthContext } from "./contexts/AuthContexts";
import { Menu } from "./components/Menu";
import { Route, Routes } from "react-router-dom";
import { paths } from "./routes/paths";

export const App = () => {
  const [auth, setAuth] = useState(null);

  const authContextValue = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      <div className="w-full flex max-h-screen">
        <div className="w-1/6">{localStorage.getItem("token-admin") && <Menu />}</div>
        <div className="w-5/6">
          <Routes>
            {paths.map((item, index) => (
              <Route key={index} {...item} />
            ))}
          </Routes>
        </div>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
