# Playgrounds in Eslöv

As part of the Technigo Web Dev Bootcamp, this project was created as the Final Project by Inna Kokic and Jenny Larsen. The displays details absout all of the available playgrounds in Eslöv, Sweden. The playgrounds are fetched from an API created and mantained by Eslövs kommun.

The user can also create an account where they get access to various challenges that maximizes the fun on the playground.

## Tech Stack

**Frontend:**

- React
- Vite
- JavaScript
- CSS

**Backend:**

- Node.js
- Express
- MongoDB
- Mongoose

## API Reference

```http
  POST /api/signin
```

| Description                                                        |
| :----------------------------------------------------------------- |
| Enables users to sign in by providing their username and password. |

```http
  POST /api/register
```

| Description                                                                   |
| :---------------------------------------------------------------------------- |
| Allows users to register by providing a unique username, email, and password. |

## Lessons Learned

The biggest struggle for us was working with an API that is not complete. The external API uses inconsistent values for the playground details which required more code in the frontend in order to retrieve all the infromation . The lesson learned from working with this API is to not assume how the API is structred but to study the structure and the documentation thoroughly before starting the neccessary fetches in the frontend.

## View it live

**Frontend:** https://eslov-playgroundlocator.netlify.app/

**Backend:** https://project-playground.onrender.com
