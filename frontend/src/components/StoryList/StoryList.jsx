// import { useState, useEffect } from "react";
// import { StoryCardList } from "../StoryCardList/StoryCardList";

// export const StoryList = () => {
//   const [stories, setStories] = useState([]);

//   useEffect(() => {
//     fetch("stories.json")
//       .then((response) => response.json())
//       .then((data) => setStories(data.stories))
//       .catch((error) => console.error("Error fetching stories:", error));
//   }, []);

//   return (
//     <div className="story-list">
//       {stories.map((story) => (
//         <StoryCardList key={story.id} story={story} />
//       ))}
//     </div>
//   );
// };

// export default StoryList;
