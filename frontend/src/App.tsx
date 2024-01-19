import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./ui/layouts/AppLayout";
import { Error } from "./ui/generic/Error";
import { WelcomePage } from "./pages/WelcomePage";
import { Dashboard } from "./pages/Dashboard";
import { FlashcardPage } from "./pages/FlashcardPage";
import { DeckPage } from "./pages/DeckPage";
import { Settings } from "./pages/Settings";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { LoginSignUpLayout } from "./ui/layouts/LoginSignUpLayout";

import { CssVarsProvider, extendTheme } from "@mui/joy/styles";

const palette = {
  primary: {
    solidBg: " #4A69BD",
    solidHoverBg: "#92A5D7",
    solidActiveBg: "#25355F",
  },
  neutral: {
    solidBg: "#7B5D1E",
    solidHoverBg: "#FAD589",
    solidActiveBg: "#F6B93B",
  },
  success: {
    solidBg: "#78E08F",
    solidHoverBg: "#AEECBC",
    solidActiveBg: "#3C7048",
  },
  danger: {
    solidBg: "#E55039",
    solidHoverBg: "#F5B9B0",
    solidActiveBg: "#B7402E",
  },
  warning: {
    solidBg: "#30525E",
    solidHoverBg: "#A0C8D7",
    solidActiveBg: "#60A3BC",
  },
};

const theme = extendTheme({
  fontFamily: { display: '"Poppins", var(--joy-fontFamily-fallback)' },
  colorSchemes: {
    light: { palette },
    dark: { palette },
  },
});

const router = createBrowserRouter([
  { path: "/", element: <WelcomePage />, errorElement: <Error /> },
  {
    element: <LoginSignUpLayout />,
    errorElement: <Error />,
    children: [
      { path: "/login", element: <Login />, errorElement: <Error /> },
      { path: "/register", element: <SignUp />, errorElement: <Error /> },
    ],
  },
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
        errorElement: <Error />,
      },
      {
        path: "/flashcards",
        element: <FlashcardPage />,
        errorElement: <Error />,
      },
      {
        path: "/deck/:id",
        element: <DeckPage />,
        errorElement: <Error />,
      },
      {
        path: "/settings",
        element: <Settings />,
        errorElement: <Error />,
      },
      {
        path: "/about",
        element: <About />,
        errorElement: <Error />,
      },
      {
        path: "/contact",
        element: <Contact />,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <RouterProvider router={router} />
    </CssVarsProvider>
  );
}

export default App;
