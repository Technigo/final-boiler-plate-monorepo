import { BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes/routes";
import { Header } from "./components/Header";
import { UserProvider } from "./contexts/UserContext";
import { ScoreProvider } from "./contexts/ScoreContext";
import { MathProvider } from "./contexts/MathContext";
import "./App.css";
import { Footer } from "./components/Footer";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <ScoreProvider>
            <MathProvider> 
              <Header />
              <main>
                <Routes>{routes}</Routes>
              </main>
              <Footer />
            </MathProvider>
          </ScoreProvider>
        </UserProvider>
      </BrowserRouter>
    </>
  );
};
