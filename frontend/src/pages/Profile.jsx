import { userStore } from "../stores/userStore";

// Detta är konstruerad av

export const Profile = () => {
  const {
    userName,
    //userImage,
    //city,
    //description,
    createdTasks,
    volunteeredTasks,
  } = userStore();

  return (
    <div>
      <h2>This is your profilepage, {userName} </h2>
      {/* <img src={userImage} alt="User" /> */}
      {/* <p>City: {city}</p>
      <p>Description: {description}</p> */}

      <div>
        <h3>Created Tasks</h3>
        <ul>
          {createdTasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Volunteered Tasks</h3>
        <ul>
          {volunteeredTasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
