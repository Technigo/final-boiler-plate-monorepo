<h1 align="center">
  <a href="">
    <img src="/frontend/src/assets/gengo.png" alt="Project Banner Image" width="500px">
  </a>
</h1>

# Flashcard App Full stack Project
<div style={{disaply:flex}}>
  <a href="">
    <img src="/frontend/src/assets/welcom.png" alt="Project Banner Image" width="500px">
  </a>
  <a href="">
    <img src="/frontend/src/assets/note.png" alt="Project Banner Image" width="500px">
  </a>
  </div>
  

Welcome to the Flashcard app Project! This project is created to provide a simple well-designed flashcard application. It has also a sticker page where a user can make notes for themselves to keep remembering some tasks/goals for their study. Therefore, it is a full-stack application with authentification. For that, I have used a range of technologies and tools to create an interactive and visually appealing web application. 

## 📗 Table of Contents

- [📖 About the Project](#about-the-project)
  - [🛠 Technology Used](#technology-used)
  - [🚀 View It Live](#view-it-live)
- [💻 Getting Started](#getting-started)
  - [Dependency Installation & Startup Development Server](#dependency-installation--starting-development-server)
- [👥 Contributions](#contributions)
- [🔭 Problem](#problem)

## About the Project

### Technology Used

Below is a list of the key technologies and tools I have employed in this project:

#### React
React is the primary frontend framework used to build this project. It's known for its component-based architecture and provides a flexible and efficient way to create user interfaces.

#### React Router

I've implemented React Router to manage the routing within our application. This allows users to navigate between different pages and sections seamlessly.

#### TypeScript

I used TS to make sure to have a better organization of my code base. TS provides not only type organization but also better readability, in my opinion. 

#### Recoil

As global state management, I chose to go with Recoil, as I wanted to try new technology. This is build by Facebook, so it fits really well with React as you can use it like a normal state in React. 

#### React Query

> Also known for TanStack Query. Powerful asynchronous state management, which is an essential tool for data retrieval in the project. It helps keep data up to date and provides a smooth user experience.

#### Node.js/Express

> In the backend, I chose to use Node.js/Express to build the API and take care of authentication. 

#### Mongoose/MongoDB

> For the database I use Mongoose/MongoDB. It stores user data to keep all the data a user has created. 

#### Vite


> Vite is used as a build tool in our project. It's known for its fast development and build times, making it ideal for a seamless development workflow.

#### Tailwind CSS/Shadcn UI/ MUI

> For the visual of this application, I decided to use Tailwind CSS to have an easy work flow, and Shadcn UI to make the application better with nice visuals. I also partly use MUI where I could not find a nice piece of Shadcn UI. 

#### Other libraries

> TipTap            (rich editor)

> Zod               (frontend form validation)

> TS particles     (nice animation)

> React hot toast   (toasting)

> React Draggable   (drag and drop for stickers)

> React Resizable

> React icons


### View It Live

[GENGO](https://gengo.netlify.app/)

### Directory Structure

Here is the directory structure of the project:

!! I am using feature architecture and some of the components are not used as I have changed some of the UI. Initially, I made it almost from scratch, but I realized that having no designer and taking care of all the visuals is difficult. Therefore, I decided to use UI libraries.

Backend
```
📦backend
 ┣ 📂controllers
 ┃ ┣ ...
 ┣ 📂middleware
 ┃ ┗ 📜auth.js
 ┣ 📂models
 ┃ ┣ ...
 ┣ 📂routes
 ┃ ┣ ...
 ┣ 📂utils
 ┃ ┣ ...
 ┣ 📜server.js
 ┣ 📜app.js
  ...
```
Frontend
```
📦src
 ┣ 📂assets
 ┃ ┣ 📜gengo.png
 ┃ ┣ 📜gengo.webp
 ┃ ┣ 📜note.png
 ┃ ┗ 📜welcom.png
 ┣ 📂components
 ┣ 📂features
 ┃ ┣ 📂dashboard
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂Calendar
 ┃ ┃ ┃ ┃ ┣ ...
 ┃ ┃ ┃ ┗ 📂Goals
 ┃ ┃ ┃ ┃ ┣ ...
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┃ ┣ ...
 ┃ ┃ ┣ 📜.DS_Store
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂flashcards
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂Category
 ┃ ┃ ┃ ┃ ┣ ...
 ┃ ┃ ┃ ┣ 📂Deck
 ┃ ┃ ┃ ┃ ┣ ...
 ┃ ┃ ┃ ┗ 📂Flashcard
 ┃ ┃ ┃ ┃ ┣ ...
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┣ 📂category
 ┃ ┃ ┃ ┃ ┣ ...
 ┃ ┃ ┃ ┣ 📂deck
 ┃ ┃ ┃ ┃ ┣ ...
 ┃ ┃ ┃ ┗ 📂flashcard
 ┃ ┃ ┃ ┃ ┣ ...
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂settings
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜InputUser.tsx
 ┃ ┃ ┃ ┗ 📜SettingsPage.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂user
 ┃ ┃ ┣ 📂actions
 ┃ ┃ ┃ ┗ 📜apiActions.ts
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜LoginForm.tsx
 ┃ ┃ ┃ ┗ 📜SignUpForm.tsx
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useDatesDecks.tsx
 ┃ ┣ 📜useEditUser.tsx
 ┃ ┗ 📜useUser.tsx
 ┣ 📂lib
 ┃ ┗ 📜utils.ts
 ┣ 📂pages
 ┃ ┣ ...
 ┣ 📂services
 ┃ ┃ ┃ ┃ ┣ ...
 ┣ 📂states
 ┃ ┗ 📂atoms
 ┃ ┃ ┣ ...
 ┣ 📂statics
 ┃ ┣ 📜colors.ts
 ┃ ┣ 📜fetchUrls.ts
 ┃ ┣ 📜texts.ts
 ┃ ┗ 📜uiContent.ts
 ┣ 📂styles
 ┃ ┣ 📜index.css
 ┃ ┗ 📜reset.css
 ┣ 📂types
 ┃ ┣ 📜commonType.ts
 ┃ ┣ 📜flashcardTypes.ts
 ┃ ┗ 📜userType.ts
 ┣ 📂ui
 ┃ ┣ 📂animation
 ┃ ┃ ┗ ...
 ┃ ┣ 📂buttons
 ┃ ┃ ┣ ...
 ┃ ┣ 📂generic
 ┃ ┃ ┣ ...
 ┃ ┣ 📂layouts
 ┃ ┃ ┣ ....
 ┃ ┣ 📂layoutsparts
 ┃ ┃ ┗ ...
 ┃ ┗ 📂shadcn
 ┃ ┃ ┃ ┃ ┣ ...
 ┣ 📂utils
 ┃ ┣ 📜apiHelpers.ts
 ┃ ┣ 📜days.ts
 ┃ ┣ 📜helpers.ts
 ┃ ┗ 📜zod.ts
 ┣ 📜.DS_Store
 ┣ 📜App.tsx
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

## Getting Started with the Project

### Dependency Installation & Startup Development Server

Once cloned, navigate to the project's root directory. This project uses npm (Node Package Manager) to manage its dependencies. Use the following command to install the dependencies, open the project in VS Code, and run a development server in your terminal:

```bash
npm i && code . && npm run dev
```

### The Problem

I had a lot of problems, especially with the backend, because I started this final project before I finished the course and while I was still learning about backend development. 
 For example, modeling was quite tricky because I wanted to have many models and I only knew how to make a simple model. Connecting each model and implementing authentication was my challenge with backend development in this project. 
I also encountered some problems with building the front end using new technologies (TS/ React Query/. Recoil). However, I enjoyed the process of finding a solution because it gave me such a joyful moment when I solved a problem. 

Also, this is my very first full-stack application, so there are so many things that should be improved. For this reason, I decided to create the v2, which I am still working on. 
Finally, my ultimate goal with GENGO is to create in NEXT.js with all the future features that I mentioned below. I also plan to make a chat place for a user to communicate with others who are also learning languages.

## 👥 Authors <a name="authors"></a>


👤 **Author1**

sansan-sakura

- GitHub: [@githubhandle](https://github.com/sansan-sakura)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/sakura-tanaka-251a36247/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🔭 Future Features <a name="future-features"></a>

> The glimpse into the project's potential and where I plan to take it in the future are the following: 

### Speed reputation system: 

> I believe that reputation is the key to learning. Therefore it would be ideal to have this system for the flashcard.

### Calendar with all the data

> In order to keep track of your learning progress, it would be wonderful to have a calendar that shows when/which card a user has studied. 
For example, a user could see how many days they studied in the last month.

### Better Rich Editor

> Now a user can add many text styles/colors... but images cannot be uploaded yet. So it would be nice to have this functionality especially for visual learners!

### Note page/Bookmarks/Resouces section

> These could be implemented for a better learning experience. 


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⭐️ Show your support <a name="support"></a>

If you like this project please Star it!

<p align="right">(<a href="#readme-top">back to top</a>)</p>




