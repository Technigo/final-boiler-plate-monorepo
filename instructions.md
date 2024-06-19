# Instructions
Your project needs two parts; a backend API, and a React frontend. You'll need to create a `User` model using mongoose, with properties for your registered user, and to store a user's access token.

Then, on the frontend side of things, you'll need to build up a registration form that POSTs to your API. You'll need to store the access token you get back in the browser using local storage, and then use that token when making other requests to your API.

Once a user is logged in, you will need to have one last endpoint which returns some content which only logged-in users should be able to access. You can choose what you want this endpoint to return, and if you want to make multiple endpoints, that's fine too. It could return hard-coded data or something from the database - either is fine. Whatever you choose, it should be displayed in the frontend after you've logged in.

To summarise, your API needs:
- Registration endpoint, to create a new user.
- Sign-in endpoint, to authenticate a returning user.
- An authenticated endpoint which only returns content if the `Authorization` header with the user's token was correct.

Your frontend needs:
- A registration form.
- A sign-in form.
- A page to show the authenticated content from the API.
- A 'sign out' button that removes the saved access token and redirects the user to the login form.

## Requirements
- Your API should have routes to register and login, and finally an authenticated endpoint.
- The authenticated endpoint should return a 401 or 403 (see [401 vs. 403 on SO](https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses)) with an error message if you try to access it without an `Authentication` access token or with an invalid token.
- Your frontend should have a registration form which POSTs to the API to create a new user.
- Your passwords in the database should be encrypted with bcrypt.
- Your API should validate the user input when creating a new user, and return error messages which could be shown by the frontend (displaying the errors in a nice way in the frontend is a stretch goal - it’s fine to just show 'Something went wrong' on the frontend if you run out of time).

## Stretch goals
So you’ve completed the requirements? Great job! Make sure you've committed and pushed a version of your project before starting on the stretch goals. Remember that the stretch goals are optional.

### Intermediate Stretch Goals
- Store data in the database for your authenticated data routes.
- When registering, display error messages from the API next to the field which has the error. For example, if the email address is invalid, show an error message next to the email input.
- To challenge yourself, try to implement Google authentication with Firebase. [Here](https://www.freecodecamp.org/news/react-firebase-authentication-and-crud-operations/) you will find detailed tutorial which will guide you through implementation (some of the steps connected to [Material UI](https://mui.com/) components can be replaced with your custom components).


### Advanced Stretch Goals
- Add more routes, perhaps even a `POST` route to create new objects in your database as a logged-in user.
- Improve validations in the backend to ensure unique email addresses, or validate the email address format using a regular expression.
