import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes/routes"; // Your regular routes
import AdminRoutes from "./routes/adminRoutes"; // Admin routes component
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";
import "./App.css";

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar /> {/* Navbar at the top of all pages*/}
      <main>
        <Routes>
          {routes} {/* Regular routes */}
          <Route path="/admin/*" element={<AdminRoutes />} /> {/* Admin routes */}
        </Routes>
      </main>
      <Footer /> {/* Footer at the bottom of all pages*/}
    </BrowserRouter>
  );
};


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import routes from "./routes/routes"; // Your regular routes
// import AdminRoutes from "./routes/adminRoutes"; // Admin routes component
// import { Navbar } from "./layout/Navbar";
// import { Footer } from "./layout/Footer";

// import { SingleCocktail } from "../pages/SingleCocktail"; // Import your SingleCocktail component
// import "./App.css";

// export const App = () => {
//   return (
//     <BrowserRouter>
//       <Navbar /> {/* Navbar at the top of all pages*/}
//       <main>
//         <Routes>
//           {routes} {/* Regular routes */}
//           <Route path="/admin/*" element={<AdminRoutes />} /> {/* Admin routes */}
//           <Route path="/cocktail/:id" element={<SingleCocktail />} />
//         </Routes>
//       </main>
//       <Footer /> {/* Footer at the bottom of all pages*/}
//     </BrowserRouter>
//   );
// };


// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import routes from "./routes/routes"; // Your regular routes
// import AdminRoutes from "./routes/adminRoutes"; // Admin routes component
// import { Navbar } from "./layout/Navbar";
// import { Footer } from "./layout/Footer";

// import { SingleCocktail } from "./pages/SingleCoctail"; // Import your SingleCocktail component
// import "./App.css";

// export const App = () => {
//   return (
//     <BrowserRouter>
//       <Navbar /> {/* Navbar at the top of all pages*/}
//       <main>
//         <Routes>
//           {routes} {/* Regular routes */}
//           <Route path="/admin/*" element={<AdminRoutes />} /> {/* Admin routes */}
//           <Route path="/cocktail/:id" component={SingleCocktail} />
//           {/* Route for SingleCocktail */}
//         </Routes>
//       </main>
//       <Footer /> {/* Footer at the bottom of all pages*/}
//     </BrowserRouter>
//   );
// };
