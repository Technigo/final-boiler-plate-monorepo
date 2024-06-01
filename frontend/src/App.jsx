import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import "./App.css";
import { Header } from "./components/Header";
import { UserProvider } from "./contexts/UserContext";
import { ScoreProvider } from "./contexts/ScoreContext";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <ScoreProvider>
            <Header />
            <main>
              {/* <Routes>{routes}</Routes> */}
              <Routes>{routes}</Routes>
            </main>
          </ScoreProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
};
