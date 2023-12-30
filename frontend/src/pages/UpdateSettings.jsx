import { useState, useEffect } from "react";
import { userStore } from "../stores/userStore";


export const UpdateSettings = ({ userId }) => {
  const { 
    isLoggedin, 
    email,
    password,
    location,
    introduction,
    products,
    image,
    handleProfileUpdate
  } = userStore;
  
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const updatedProfileData = {
        email,
        password,
        location,
        introduction,
        products,
        image
    };

    await handleProfileUpdate(isLoggedin, userId, updatedProfileData);
  };

  return (
    <form onSubmit={handleUpdateSubmit}>
        {/* Form fields for ad details */}
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        {/* ... Other form fields ... */}
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Update Ad</button>
    </form>
  )
}
