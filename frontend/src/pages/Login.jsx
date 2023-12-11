
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logos from '../components/Logos';
import { userStore } from '../stores/userStore';
import { useNavigate } from 'react-router-dom';
import { PromptForm } from '../components/PromptForm';

export const Login = () => {
  const [recipes, setRecipes] = useState([]);

  const addNewRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  return (
    <>
      <PromptForm addNewRecipe={addNewRecipe} />
      <div>
        <h2>Recipes:</h2>
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index}>
              {/* Render your recipe details here */}
              <div>{recipe.ingredients}</div>
              <div>{recipe.instructions}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};


// // Define the 'Login' functional component.
// export const Login = () => {
//   // Create state variables for 'username' and 'password' using 'useState'.
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   // Use the 'useNavigate' hook to programmatically navigate between routes.
//   const navigate = useNavigate();

//   // Access the 'handleLogin' function from the 'userStore'.
//   const storeHandleLogin = userStore((state) => state.handleLogin);

//   // Function to handle the click event of the login button.
//   const onLoginClick = async () => {
//     if (!username || !password) {
//       // Display an alert if either 'username' or 'password' is empty.
//       alert("Please enter both username and password");
//       return;
//     }
//     try {
//       // Call the 'handleLogin' function from 'userStore' with 'username' and 'password' parameters.
//       await storeHandleLogin(username, password);
//       // Get the 'isLoggedIn' state from 'userStore'.
//       const isLoggedIn = userStore.getState().isLoggedIn;
//       if (isLoggedIn) {
//         // If the user is logged in, navigate to the "/home" route.
//         navigate("/home");
//       }
//       // Additional logic after successful login can be added here.
//     } catch (error) {
//       // Handle any errors that occur during login and display an alert.
//       console.error("Login error:", error);
//       alert("An error occurred during login");
//     }
//   };

//   // Text content for the heading and paragraphs.
//   const text = {
//     heading: "Login Page",
//     intro: "login here...",
//     loremIpsum:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, vitae fugit ipsam quo accusantium autem officia necessitatibus ullam voluptati",
//   };

//   // Render the component content.
//   return (
//     <>
//       <nav>
//         {/* Create a navigation menu with links to the login and sign-up routes. */}
//         <ul className="app-ul">
//           <li className="app-li">
//             <Link to="/">Login</Link>
//           </li>
//           <li className="app-li">
//             <Link to="/register">Sign Up</Link>
//           </li>
//         </ul>
//       </nav>
//       {/* Render the 'Logos' component. */}
//       <Logos />
//       <div>
//         {/* Display the heading and paragraphs. */}
//         <h2>{text.heading}</h2>
//         <p>{text.intro}</p>
//         <p>{text.loremIpsum}</p>
//         <div className="user-login">
//           {/* Create input fields for 'username' and 'password' and associate them with state variables. */}
//           <input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {/* Create a button for logging in and attach the 'onLoginClick' event handler. */}
//           <button onClick={onLoginClick}>Login</button>
//         </div>
//         <PromptForm />
//       </div>
//     </>
//   );
// };

// SUMMARY

// This code defines the Login component, which handles user login functionality. It imports necessary components, hooks, and the user store, and it defines state variables for username and password. The component also provides a form for entering login credentials, handles the login button click event, and uses React Router to navigate between login and sign-up routes. Additionally, it renders text content and the 'Logos' component.
