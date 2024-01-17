import React, { useState } from "react"; // Import useState here
import Navbar from "./navbar";
import Footer from "./footer";
import styled from "styled-components";
import { Link } from "react-router-dom";

const tablet = `(min-width: 640px)`;
const desktop = `(min-width: 1007px)`;

const PageContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  min-height: 100vh;
`;

const StyledH1 = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #01999a;
  font-family: "JosefinSans";

  @media ${tablet} {
    font-size: 35px;
  }

  @media ${desktop} {
    font-size: 45px;
  }
`;

const StyledInput = styled.input`
  color: #01999a;
  font-family: "JosefinSans";
  text-align: left;
  margin-top: 5px;
  margin-bottom: 20px;
  width: 90%;
  padding: 8px;
  border: 2px solid #01999a;
  border-radius: 10px;
  background-color: #fcfce1;
`;

const FormLabel = styled.label`
  color: #01999a;
  font-family: "JosefinSans";
  display: block;
  margin-bottom: 5px;
`;

const Button = styled.button`
  background-color: white;
  color: #01999a;
  font-family: "JosefinSans";
  padding: 10px 20px;
  border: 2px solid #01999a;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  transition-duration: 0.2s;

  &:hover {
    background-color: #01999a;
    color: white;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const StyledParagraph = styled.p`
  color: #01999a;
  font-family: "JosefinSans";
  text-align: left;
  margin-bottom: 10px;
`;

const BackButton = styled.button`
  background-color: #01999a;
  color: white;
  font-family: "JosefinSans";
  padding: 10px 10px;
  border: 2px solid yellow;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 20px;
  margin: 4px 2px;
  transition-duration: 0.4s;

  &:hover {
    background-color: white;
    color: #01999a;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const Suggestion = () => {
  const [formData, setFormData] = useState({
    restaurantName: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <PageContainer>
      <Navbar />
      <StyledH1>Suggest changes to the restaurants description</StyledH1>
      <form 
        action="https://formsubmit.co/foodiemoodieappen@gmail.com"
        method="POST"
      >
        <FormLabel>Restaurant Name*:</FormLabel>
        <StyledInput
          type="text"
          name="restaurantName"
          value={formData.restaurantName}
          onChange={handleChange}
          required
        />
  
        <FormLabel>Your Description Suggestion*:</FormLabel>
        <StyledInput
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
  
        <StyledParagraph>Fields marked with * are mandatory.</StyledParagraph>
        <Button type="submit">Submit</Button>
        <Link to="/result">
          <BackButton>Go back to results</BackButton>
        </Link>
      </form>
      <Footer />
    </PageContainer>
  );
};

export default Suggestion;
