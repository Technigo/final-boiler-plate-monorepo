import { useState, useEffect } from "react";
import { userStore } from "../stores/userStore";
import BackArrow from "../components/BackArrow";

export const UpdateSettings = () => {
  // For retrieving the updated user profile data later on
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);

  // For fetching the current user profile data
  const isLoggedin = userStore((state) => state.isLoggedin);
  const userId = userStore((state) => state.userId);
  const username = userStore((state) => state.username);
  const storeHandleProfileDisplay = userStore((state) => state.handleProfileDisplay);
  const storeHandleProfileUpdate = userStore((state) => state.handleProfileUpdate);
  
  const [profileData, setProfileData] = useState({
    email: "", 
    password: "",
    introduction: "",
    location: "",
    products: [],
    image: null,
  });

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const profileData = await storeHandleProfileDisplay(isLoggedin, userId);
        if (profileData) {
          setProfileData(profileData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    getProfileData();
  }, [storeHandleProfileDisplay, isLoggedin, userId]);

  // Handle changes in states based on user's inputs
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      setPassword(profileData.password);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleEmailUpdate = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      setEmail(profileData.email);
    } else {
      setEmail(e.target.value);
    }
  };

  const handleLocationUpdate = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      setLocation(profileData.location);
    } else {
      setLocation(e.target.value);
    }
  };

  const handleProductsUpdate = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      setProducts(profileData.products);
    } else {
      setProducts(e.target.value);
    }
  };

  const handleIntroductionUpdate = (e) => {
    e.preventDefault();
    if (e.target.value === "") {
      setIntroduction(profileData.introduction);
    } else {
      setIntroduction(e.target.value);
    }
  };

  const handleImageUpdate = (e) => {
    e.preventDefault();
    if (e.target.files[0] === null) {
      setImage(profileData.image);
    } else {
      setImage(e.target.files[0]);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const updatedProfileData = {
      email, 
      password,
      introduction,
      location,
      products,
    };

    await storeHandleProfileUpdate(
      isLoggedin, 
      userId, 
      updatedProfileData,
      image
    );
  };

  return (
    <div>
      <BackArrow />
      <h1>Update settings</h1>

      <form onSubmit={handleUpdateSubmit}>
        {/* Form fields for user details */}
        <div>
          <p>Username &#40;cannot be updated&#41;:</p>
          <p>{username}</p>
        </div>

        <div>
          <p>Current password:</p>
          <p>{profileData.password}</p>
        </div>

        <div>
          <label htmlFor="password">New password:</label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="leave blank to keep the same"
            value={password}
            onChange={handlePasswordUpdate}
          />
        </div>

        <div>
          <p>Current email:</p>
          <p>{profileData.email}</p>
        </div>

        <div>
          <label htmlFor="email">New email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="leave blank to keep the same"
            value={email}
            onChange={handleEmailUpdate}
          />
        </div>

        <div>
          <p>Current location:</p>
          <p>{profileData.location}</p>
        </div>

        <div>
          <label htmlFor="location">New location:</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="leave blank to keep the same"
            value={location}
            onChange={handleLocationUpdate}
          />
        </div>

        <div>
          <p>Current products:</p>
          <p>{profileData.products}</p>
        </div>

        <div>
          <label htmlFor="products">New products:</label>
          <input
            type="text"
            name="products"
            id="products"
            placeholder="leave blank to keep the same"
            value={products}
            onChange={handleProductsUpdate}
          />
        </div>

        <div>
          <p>Current introduction:</p>
          <p>{profileData.introduction}</p>
        </div>

        <div>
          <label htmlFor="introduction">New introduction:</label>
          <textarea
            name="introduction"
            id="introduction"
            placeholder="leave blank to keep the same"
            rows={4}
            cols={50}
            value={introduction}
            onChange={handleIntroductionUpdate}
          />
        </div>

        <div>
          <label htmlFor="image">Current profile image:</label>
          <img src={profileData.image} alt={username} />
        </div>
        
        <div>
          <label htmlFor="image">Update profile image:</label>
          <input type="file" onChange={handleImageUpdate} />
        </div>

        <button type="submit">Update settings</button>
      </form>
    </div>
  )
}
