# Carl Berner Cocktail Club - About the Project

We are a group of friends in Oslo sharing a passion for cocktails. Our journey started from sharing our favorite drinks and evolved into a regular tradition. We meet to explore cocktail making, focusing on new themes each time. Our Instagram page documents our adventures, where we post about our meetings and the drinks we make.

For this project, we wanted to extend our platform to include a website for the club. The Carl Berner Cocktail Club web application is created for cocktail enthusiasts based in Oslo. It serves as a platform to explore and share the art of cocktail making. 

# Open website
The application features a main page displaying selected cocktails, an 'About Us' page, and a comprehensive list of all cocktails with detailed recipes and information. It also includes a robust search function for exploring all available cocktails. The backend for user registration and login is also ready, and will be set up in the frontend at a later point. 

# Admin Panel
The admin panel is a secure area where administrators can log in to manage the application. Features include:

- Adding, editing, and deleting cocktail recipes, including image uploads
- Registering new admins
- Viewing the entire user list
- Upgrading users to admin roles
- The CSS for the admin part has not yet been prioritized, as it was more important that the functions we needed actually work and also what the user can see. 

![AdminDashboard](/frontend/public/images/AdminDashboard.png)
*The Admin Dashboard*

![ManageCocktails](/frontend/public/images/ManageCocktails.png)
*Admin Cocktail Management*

# Tools and Technologies
- Frontend: React, React Router, Styled Components, Zustand, .env
- Backend: Node.js, Express, MongoDB, Mongoose, Cloudinary and express-files for image uploads, JWT for authentication, .env 
- Development Tools: Vite, Babel

# Features
- Cocktail Display: Showcases a curated selection of cocktails with complete recipes.
- User Interaction: Users can search for cocktails and view detailed information.
- Admin Management: Secure admin panel for comprehensive content management.


# Challenges and Problems:

# Transition from Multer to Cloudinary for Image Upload
The project initially used Multer for handling image uploads. However, as we spent too much time trying to make it work without success, we transitioned to Cloudinary. This shift presented its own set of challenges, particularly in integrating it to our existing code. Also, it did not work until we added express-files as well. 

# API Integration for Adding and Editing Cocktail Recipes
Integrating the API for adding and editing cocktail recipes was a complex task. This involved not just the technical implementation on both backend and frontend, but also ensuring that the user interface was intuitive. Admins can now easily add new recipes and modify existing ones, making the process as straightforward as possible.

# Protecting Webpages and Routes Through Authentication and Managing JWT Tokens for Secure Authentication

We placed a strong emphasis on security, especially in protecting certain webpages and routes. This involved implementing a robust authentication system through middleware, roles and JWT tokens that allows only authorized users to access specific functionalities, particularly within the admin panel. 

Implementing JWT (JSON Web Tokens) for secure authentication was a significant task. It involved ensuring that tokens were generated, stored, and used correctly to maintain the integrity and security of user sessions and data, first in backend, but later through the zustand store in frontend as well. 

As of now, the main challenges connencted to this and role handeling that still remain are upgrading users to admin, and checking the role of the admin as an extra security for the frontend routes.

# Implementing the Filter Function
One of the key challenges we faced was implementing a robust and efficient filter function. This feature is crucial for enhancing user experience, as it allows users to easily navigate through our extensive cocktail collection and find drinks that suit their preferences. This function is not working yet, but we will keep working on it.

# Carousel Implementation
Creating an interactive and visually appealing carousel for showcasing featured cocktails posed a challenge, which we have not yet been able to solve.


# Further Development
We will use this page actively, so we will keep developing it. 
The problems that have not been fixed will be prioritised.

We have also listed what will be developed further in the Develop.md file. 

# View it Live
- Frontend: Deployed Frontend Application
- Backend: Deployed Backend Application
