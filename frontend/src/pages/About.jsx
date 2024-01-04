import { Chat } from "../components/Chat";
import { UserProfile } from "./UserProfile";

export const About = () => {
  return (
    <div>
      <h1>Welcome to our about page!</h1>
      <p>
        We created this app for people to get together travelling to the same
        distination in a car. Our aim is for people
      </p>
      <UserProfile />
      <Chat />
    </div>
  );
};
