# Final Project Greenbuddy
Greenbuddy is a full stack project providing a web app for individuals/households/amateur gardeners to give away their surplus home-made products for free and/or search for free products to pick up. The original idea was to help reduce the food waste which is common in Sweden as many people cannot take care of all the surplus products that they produce every year. 

# Getting Started with the Project
**Dependency Installation & Startup Development Server**
Once cloned, navigate to the project's root directory and this project uses npm (Node Package Manager) to manage its dependencies.

The command below is a combination of installing dependencies, opening up the project on VS Code and it will run a development server on your terminal.

npm i && code . && npm run dev

**Current features**
- Authentication: User can sign up and log in using their credentials
- Once logged in, user has access to the products available and their own products
- User can search by product, ad title or location
- User can see an ad for a product and the advertiser's profile, save the ad by clicking the heart and/or contact the advertiser via email
- User can manage their own ads, for example, creating a new ad, editing or deleting an ad, and unsaving an ad
- User can also see their own profile, edit it or delete their account

**Potential features**
- Search by filters and geolocation
- Customization of homepage based on the user's preset preferences
- Message within the app

**Tech stack**
Frontend:
- React
- Navigation using React Router
- Zustand (global state management)
- emailJS (sending e-mail from client side)
- react-image-crop (for image cropping or resizing functionality)
- lotties (animations)
- react-slick (carousel)
- react-bootstrap (For pop-up window)
- sweetalert2 (For pop-up error/success messages)

Backend:
- MongoDB database
- Mongoose
- Express
- multer (file upload middleware)
- Cloudinary (for file storage)
- multer-storage-cloudinary (Cloudinary multer storage engine)

**Authors**
We are four students at Technigo's Web Development Bootcamp Fall 2023:
- Hang Nguyen
- Maria Pettersson
- Janice Cheng
- Mina Darabi

# View it live
Deployed backend on Render: https://greenbuddy.onrender.com

Deployed frontend on Netlify: https://greenbuddy.netlify.app/

