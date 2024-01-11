<p align="center"><img src="https://openair-feast.netlify.app/logo11.png" alt="Logo" width="80%"></p><br>

As part of the Technigo Web Dev Bootcamp, this project was created as the Final Project by Emmy Dieden and Idah Collin. Open AIr Feast generates camping stove-friendly recipes by integrating with the OpenAI API. Recipe generation is based on user prompts of one to three ingredients and dietary requirements. Our hope by building this website is to make it easier for people to connect with nature and enjoy delicious meals outdoors. <br><br>

## Technologies used

<div style="display: flex; justify-content: space-between; gap: 10px;">

<div style="width: 30%;">

**Frontend**

- React
- Vite
- Zustand
- React Router
- React Icons

</div>

<div style="width: 30%;">

**Backend**

- Node.js
- Express
- MongoDB
- Mongoose
- OpenAI
- Nodemon

</div>

<div style="width: 30%;">

**Other**

- GitHub
- Figma
- VScode
- Squoosh
- Affinity Designer<br><br><br>
</div>
</div>

## Database Operations

- **RecipeModel:** Represents the data structure for recipes, including user input, search words, title, description, ingredients, instructions, and creation timestamp.
- **MongoDBOperations:** Implements CRUD operations for managing recipes in the MongoDB database.

## AI integration

**OpenAI:** The backend integrates with the OpenAI API to generate text-based recipes based on user prompts.

**Endpoint:** Provides an /openai/generateText endpoint to handle AI-driven recipe generation.

## API Endpoints

### External APIs

**OpenAI API:**

- **Description:** Utilized to generate text-based recipes based on user prompts.
- **Endpoint:** `POST /openai/generateText`
- **Usage:** This API is integrated into the backend to dynamically create recipes using the OpenAI GPT-3 model.

### Internal APIs

**MongoDB API:**

- **Description:** The backend acts as an API to interact with the MongoDB database.
- **Endpoints:**
  - `GET /`: Lists all available API endpoints for reference.
  - `GET /recipes`: Retrieves all stored recipes.
  - `GET /recipes/search/:query`: Searches for recipes based on a specified query.

## How to Run the Project

### Backend

1. **Clone the Repository:**

```
git clone final-boiler-plate-monorepo
```

2. **Navigate to the Backend Directory**

```
cd backend
```

3. **Install Dependencies**

```
npm install
```

4. **Set Environment Variables**
   Create a .env file in the backend directory and add necessary environment variables, including PORT, MongoDB connection details, and OpenAI API key.

Example .env:

```
PORT=3001
MONGO_URL=[your-mongodb-url]
OPENAI_API_KEY=[your-openai-api-key]
```

5. **Start the Backend Server**

```
npm start
```

### Frontend

1. **Navigate to the Frontend Directory**

```
cd frontend
```

2. **Install Dependencies**

```
npm install
```

3. **Set Environment Variables**
   Create a .env file in the frontend directory and add an environment variables for the backend localhost.

Example .env:

```
VITE_BACKEND_API=[backend-localhost]
```

4. **Start the Frontend Development Server**

```
npm run dev
```

## Challenges

The
!!! UNDER CONSTRUCTION !!!
Stage 1 (behöver skrivas om)
Set up of boilerplate, installation. Created endpoints (no connection to AI at this time). Connected frontend to backend using the API endpoints. Implemented AI, possible to do a general prompt via the frontend localhost and get a respons in the console.

Challenges:
What kind of endpoints as we were to use AI. Solved by discussing in our team and go through material.
Old documentation AI... solved with...

How to prompt where....

GPT prompt: Put effort into rewriting this to get the result we want. Next step would be to fine-tune the prompt. Good way to control if recipes are up to standard, preventing the GPT to add too many ingreidents, checking whether the dishes seem edible, and that the dishes contain appropriate ampunt of nutriants and carbs for and outdoor adventure. Fine-tuning is a good way to check that the GPT actually is following instructions, eg. using only one saucepan.<br><br>

## View it live

**Frontend:** https://openair-feast.netlify.app/<br>

**Backend:** https://ai-recipes-collin-dieden.onrender.com<br><br>

## Connect with us

<div style="display: flex; justify-content: space-between; gap: 5px;">

<div style="width: 48%;">

**Emmy Dieden:**<br>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/emmy-dieden-774574283)<br>

[![GitHub](https://img.shields.io/badge/GitHub-black?style=flat-square&logo=github)](https://github.com/EmmyDieden)<br>

[Emmy's portfolio](https://emmy-dieden-portfolio.netlify.app/)<br>

</div>

<div style="width: 48%;">

**Idah Collin:**<br>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/idah-collin)<br>

[![GitHub](https://img.shields.io/badge/GitHub-black?style=flat-square&logo=github)](https://github.com/IdahCollin)<br>

[Idah's portfolio](https://idah-collin-portfolio.netlify.app/)<br>

</div>

</div>
