import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Heading } from "../components/reusableComponents/Heading";

export const Policy = () => {
  return (
    <>
      <Navbar
        menuItems={[
          { path: "/login", name: "Login" },
          { path: "/register", name: "Signup" },
          { path: "/terms", name: "Terms" },
        ]}
        menuDesks={[
          { path: "/login", name: "Login" },
          { path: "/register", name: "Signup" },
          { path: "/terms", name: "Terms" },
        ]}
      />
      <div className="container">
        <Heading
          level={1}
          text="Terms of Service"
          aria-label="Terms of Service"
        />
        <h1>About Green Buddy Terms of Service</h1>
        <ul>
          <li>
            Acceptance of Terms: By using the Green Buddy app, you agree to
            abide by these terms and conditions.
          </li>
          <li>
            2. Intellectual Property: You must respect Green Buddy's
            intellectual property rights, and you are not allowed to reproduce
            the service elsewhere.
          </li>
          <li>
            3. Content Posting: When creating an ad or sharing content on the
            Service, you must be entitled to post the content, either as the
            owner or with the rights holder's permission. Content depicting
            anything illegal is strictly prohibited.
          </li>

          <li>
            4. Limited Responsibility: Green Buddy has limited responsibility
            for the availability, performance, and correctness of information
            provided through the Service.
          </li>
          <li>
            5. Privacy Policy: You should be aware that Green Buddy handles
            personal information according to the current Privacy Policy.
          </li>
          <li>
            6. Changes to Terms: Green Buddy reserves the right to update these
            terms, and users will be notified of any changes.
          </li>
          <li>
            7. Termination: Green Buddy reserves the right to terminate user
            accounts for violations of these terms.
          </li>
          <li>
            8. Dispute Resolution: Any disputes will be resolved through
            arbitration in accordance with applicable laws.
          </li>

          <p>
            By using the Green Buddy app, you acknowledge that you have read and
            understood these terms and agree to be bound by them.
          </p>
        </ul>
      </div>
      <Footer />
    </>
  );
};
