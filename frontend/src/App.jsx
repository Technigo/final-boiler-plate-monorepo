import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { UserProvider } from "./contexts/UserContext";
import "./App.css";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <main>
            <Routes>{routes}</Routes>
          </main>
        </UserProvider>
      </BrowserRouter>
    </>
  );
};
