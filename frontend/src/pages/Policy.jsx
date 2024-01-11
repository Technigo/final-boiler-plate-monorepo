import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Heading } from "../components/reusableComponents/Heading";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore";
import { useEffect } from "react";
import BackArrow from "../components/reusableComponents/BackArrow";
import Swal from "sweetalert2";
import "./policy.css";

export const Policy = () => {
  const navigate = useNavigate();
  // Get 'isLoggedIn' and 'accessToken' from the 'userStore'.
  const isLoggedin = userStore((state) => state.isLoggedin);
  const handleLogout = userStore((state) => state.handleLogout);
  // useEffect hook to check user authentication status.
  useEffect(() => {
    if (!isLoggedin) {
      // If the user is not logged in, show an alert and navigate to the login route.
      Swal.fire({
        title: "Error!",
        text: "Please log in to see the content",
        icon: "error",
      });
      navigate("/login");
    }
  }, [isLoggedin, navigate]);

  const logoRedirectPath = isLoggedin ? "/home" : "/";

  return (
    <>
      <Navbar
        menuItems={[
          { path: "/home", name: "Home" },
          { path: "/search", name: "Search" },
          { path: "/settings", name: "My Settings" },
          { path: "/manage-your-ads", name: "My Products" },
          { path: "/about", name: "About" },
          { path: "/terms", name: "Terms" },
          {
            name: "Logout",
            onClick: () => {
              handleLogout();
              navigate("/");
            },
          },
        ]}
        menuDesks={[
          { path: "/home", name: "Home" },
          { path: "/search", name: "Search" },
          { path: "/settings", name: "My Settings" },
          { path: "/manage-your-ads", name: "My Products" },
          { path: "/about", name: "About" },

          {
            name: "Logout",
            onClick: () => {
              handleLogout();
              navigate("/");
            },
          },
        ]}
        logoRedirectPath={logoRedirectPath}
      />
      <div className="main-container">
        <div className="main-wrapper">
          <div className="arrow-container">
            <BackArrow />
          </div>
          <Heading
            level={1}
            text="Terms of Service"
            aria-label="Terms of Service"
            className="heading-terms"
          />
          <Heading
            level={2}
            text="About Green Buddy Terms of Service"
            aria-label="About Green Buddy Terms of Service"
            className="heading-terms"
          />
          <div className="terms-wrapper">
            <ul>
              <li>
                <span>Acceptance of Terms:</span> By using the Green Buddy app,
                you agree to abide by these terms and conditions.
              </li>
              <li>
                <span>Intellectual Property:</span> You must respect Green
                Buddy&apos;s intellectual property rights, and you are not
                allowed to reproduce the service elsewhere.
              </li>
              <li>
                <span>Content Posting:</span> When creating an ad or sharing
                content on the Service, you must be entitled to post the
                content, either as the owner or with the rights holder&apos;s
                permission. Content depicting anything illegal is strictly
                prohibited.
              </li>

              <li>
                <span>Limited Responsibility:</span> Green Buddy has limited
                responsibility for the availability, performance, and
                correctness of information provided through the Service.
              </li>
              <li>
                <span>Privacy Policy:</span> You should be aware that Green
                Buddy handles personal information according to the current
                Privacy Policy.
              </li>
              <li>
                <span>Changes to Terms:</span> Green Buddy reserves the right to
                update these terms, and users will be notified of any changes.
              </li>
              <li>
                <span>Termination:</span> Green Buddy reserves the right to
                terminate user accounts for violations of these terms.
              </li>
              <li>
                <span>Dispute Resolution:</span> Any disputes will be resolved
                through arbitration in accordance with applicable laws.
              </li>
            </ul>
            <p>
              By using the Green Buddy app, you acknowledge that you have read
              and understood these terms and agree to be bound by them.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
