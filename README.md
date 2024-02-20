
# Plants by Holm & Witting

This is a final project of the Technigo Web Dev Boot Camp, pair-programmed by Julia Holm and Vera Witting. It's a plant web shop with additional features like a wishlist for your favourite plants, a mockup checkout function, an inspiration page. It's a full stack project, containing an API of plants, user-handling, and back-end routing. 

Plants by is created with a lot of love and a little frustration, thank you for checking it out! 


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URL` - Get your Conncection String from MongoDB Atlas.

You will also need to add the following environment variables to your .env file of the frontend.

`VITE_BACKEND_API` - Add your own backend API deployment link

There is also a sectet jwt key

`JWT_SECRET` - ADD IT BY DOING WHAT?!?!


## API Reference

### Base URL

```https://plants-holm-witting-backend.onrender.com/api```

### Authentication

#### Register a new user

```http
POST /auth/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. **Unique**. The username of the new user. |
| `password`      | `string` | **Required**. The password for the new user |
| `email`      | `string` | **Required**. The email-address for the new user. |


#### Log in with an existing user

```http
POST /auth/login
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. **Unique**. The username of the new user. |
| `password`      | `string` | **Required**. The password for the new user |

#### Verify user authentication.

```http
POST /auth/verify
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |

### Users 

#### Get information about all users

```http
GET /users/all-users
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |

### Get information about logged in user

```http
GET /users/profile
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |

### Plants
#### Get all plants

```http
GET /plants
```
| Description                |
| :------------------------- |
| Gets all plants |

#### Get single plant

```http
GET /plants/${id}
```
| Description                |
| :------------------------- |
| Gets single plant |

#### Get plants in the climbing category

```http
GET /plants/category/climbing
```
| Description                |
| :------------------------- |
| Gets plants in the climbing category |

#### Get plants in the shade-loving category

```http
GET /plants/category/shady
```
| Description                |
| :------------------------- |
| Gets plants in the shade-loving category |

#### Get plants in the easy-to-care-for category

```http
GET /plants/category/easy
```
| Description                |
| :------------------------- |
| Gets plants in the easy-to-care-for category |

#### Get plants in the popular category

```http
GET /plants/category/popular
```
| Description                |
| :------------------------- |
| Gets plants in the popular category |

#### Get plants in the pet-friendly category

```http
GET /plants/category/pet-friendly
```
| Description                |
| :------------------------- |
| Gets plants in the pet-friendly category |

### Favourites

#### Add a plant to the user's Favourites

```http
POST  /favourites/add-to-favourties
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |
| `id`      | `string` | **Required** The plant Id (_id) |

#### Get the user's favourite plants

```http
GET /favourites/get-my-favourites
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |


#### Remove a plant from the user's favourites

```http
DELETE /favourites/remove-favourite
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Auth`      | `Header` | **Required**. Authorization Middleware checks for header "Auth" |
| `accessToken`      | `string` | **Required**. AccessToken comes from the logged in user |
| `id`      | `string` | **Required** The plant Id (_id) |

## Tech Stack
### Server
Framework:
Express (^4.18.2)

Database:
MongoDB (^6.3.0),
Mongoose (^8.1.0),

Authentication:
JSON Web Token (jsonwebtoken) (^9.0.2),
Bcrypt (^5.1.1)

Middleware:
Cookie Parser (^1.4.6),
CORS (^2.8.5),
Express Async Handler (^1.2.0)

Development Tools:
Nodemon (^3.0.3)

Environment Configuration:
dotenv (^16.3.1)

### Client

Framework/Library:
React (^18.2.0),
Vite (^5.0.8)

Styling:
Emotion (^11.11.3),
Material-UI (^5.15.5)

State Management:
Zustand (^4.4.7)

Routing:
React Router DOM (^6.21.2),

Animation:
Lottie React (^2.4.0)

Icons:
React Icons (^5.0.1)

Responsive Design:
React Responsive (^9.0.2)

Development Tools:
ESLint (^8.55.0)

## View it Live
Backend only: [![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)](https://plants-holm-witting-backend.onrender.com/)


Frontend: 
[![Netlify Status](https://api.netlify.com/api/v1/badges/a058da08-22d3-4898-8913-fba7338c9a1c/deploy-status)](https://plantsby-holm-witting.netlify.app/)

## 🔗 Links

### Julia Holm
[![portfolio](https://img.shields.io/badge/my_portfolio-1DA1F2?style=for-the-badge&logo=ko-fi&logoColor=white)](https://juliaholm-portfolio.netlify.app/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/julia-holm-63249226b/)

[![gitgub](https://img.shields.io/badge/github-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JuliaHolm)

### Vera Witting
[![portfolio](https://img.shields.io/badge/my_portfolio-1DA1F2?style=for-the-badge&logo=ko-fi&logoColor=white)](https://verawitting-portfolio.netlify.app/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vera-witting-ba51b1b6/)

[![gitgub](https://img.shields.io/badge/github-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/verawitting)
