import "./AboutUs.css";

export const AboutUs = () => {
  //When the home button is clicked, this function kicks in
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="about-us">
      <p>
        We are a group of four women who attend Technigos Web developer boot
        camp during the fall 2023. We are all pretty new to coding and this is
        our final project during this boot camp. We got some inspirational
        previous projects to look at and also some suggestions from the school.
        After going through these we sat down and brain stormed and eventually
        came up with this idea - a <i>Whisper wall</i> where the users can both
        read others stories and also post their own stories. The stories can be
        both old legends and tales, but also funny stories that has happened
        today. We wanted to connect the stories to a map so the users can find
        new places to visit based on where "the good stories" are, but also so
        that the user can choose stories from only their city for example.
      </p>
      <p>
        We really hope that you will enjoy this web page just as much as we do!
        And please, if you have a story to tell -
        <i>share it with the rest of us!</i>
      </p>
    </div>
  );
};
