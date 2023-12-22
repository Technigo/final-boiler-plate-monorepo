import { Footer } from "../components/Footer"
import { Navbar } from "../components/Navbar"



export const Landing = () => {
  return (
    <>
    <Navbar menuItems={[{path: "/login", name: "Login"}, {path: "/about", name: "About"} , {path: "/terms", name: "Terms"}]}/>
    <div>Landing</div>

    <Footer />
    </>
  )
  
}
