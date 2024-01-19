import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";

import { useSetRecoilState } from "recoil";
import { currentUserState } from "../../../states/atoms/userAtoms";
import { Footer } from "../../layoutsparts/Footer";
import { Header } from "../../layoutsparts/Header";

export const AppLayout = () => {
  const navigate = useNavigate();
  const setCurrentUser = useSetRecoilState(currentUserState);
  useEffect(() => {
    const user = localStorage.getItem("userName");
    if (user) setCurrentUser({ name: user, login: true });
    else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="min-h-screen h-fit bg-amber-50/50">
      <Toaster
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          style: {
            background: "rgb(255 ,251 ,235)",
            color: "#333",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#3C7048",
              secondary: "#fff",
            },
          },
          error: {
            duration: 3000,
            iconTheme: {
              primary: "#B7402E",
              secondary: "#fff",
            },
          },
        }}
      />
      <main className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        <Header />
        <div className="p-2 md:p-4 mx-auto w-full max-w-[1200px]">
          <div className="max-w-[1200px]  min-h-full">
            <Outlet />
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
};
