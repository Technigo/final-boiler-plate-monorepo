import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { UserProvider } from "./contexts/UserContext";
import { ScoreProvider } from "./contexts/ScoreContext";
import { MathProvider } from "./contexts/MathContext";
import "./App.css";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <ScoreProvider>
            <MathProvider>
              <main>
                <Routes>{routes}</Routes>
              </main>
            </MathProvider>
          </ScoreProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
};
