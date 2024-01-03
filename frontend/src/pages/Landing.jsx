import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"



export const Landing = () => {
  return (
    <>
    <Navbar menuItems={[{path: "/login", name: "Login"},{path: "/register", name: "Signup"} , {path: "/terms", name: "Terms"} , {path: "/about", name: "About"}]}  menuDesks={[{path: "/login", name: "Login"},{path: "/register", name: "Signup"} ,{path: "/terms", name: "Terms"} , {path: "/about", name: "About"} ]}/>
    <div>Landing</div>

    <Footer />
    </>
  )
  
}
