import "./AboutUs.css";

export const AboutUs = () => {
  //When the home button is clicked, this function kicks in

  return (
    <div className="about-us">
      <h2>About us</h2>
      <p>
        We are a group of four women who attend Technigos Web developer boot
        camp during the fall 2023. This is our final project during the boot
        camp. After some brain storming together we eventually came up with this
        idea - a <i> Whisper wall </i>
        where the users can both read other peoples stories and also post their
        own stories. The stories can be both old legends and tales, but also
        funny stories that has happened today. We wanted to connect the stories
        to a map so the users can find new places to visit based on where "the
        good stories" are, but also so the user can choose stories from a
        certain city.
        <br /> <br />
        We really hope that you will enjoy this web page just as much as we do!
        And please, if you have a story to tell -
        <i> share it with the rest of us! ♥ </i>
      </p>
      <div className="about-img">
        <img src="./public/aboutimg.jpg" />
      </div>
    </div>
  );
};
