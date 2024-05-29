import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { UserProvider } from "./contexts/UserContext";
import { ScoreProvider } from "./contexts/ScoreContext";
import "./App.css";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <ScoreProvider>
            <main>
              <Routes>{routes}</Routes>
            </main>
          </ScoreProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
};
