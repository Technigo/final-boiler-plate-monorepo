import { useEffect, useState } from "react";
import { taskStore } from "../stores/taskStore";
import { Button } from "./Buttons/Button";
import { BodyText } from "./Typography/BodyText";
import styled from "styled-components";

const StyledFilterTaskFeed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
  height: 600px;

  @media screen and (min-width: 450px) {
    height: 550px;
  }

  @media screen and (min-width: 600px) {
    height: 400px;
  }

  @media screen and (min-width: 1000px) {
    width: 700px;
  }
`;

const StyledFilters = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    gap: 50px;
  }
`;

const StyledSelects = styled.select`
  display: flex;
  width: 190px;
  height: 40px;
  border: 1px solid var(--button);
  background-color: var(--grey);
  border-radius: 20px;
  padding: 5px;
`;

// Define the FilterTaskFeed component as a functional component.
export const FilterTaskFeed = () => {
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const { fetchTasks } = taskStore();

  // Function to filter tasks by category and area
  const filterTasks = (selectedCategory, selectedArea) => {
    taskStore
      .getState()
      .filterTasksByCategoryAndArea(selectedCategory, selectedArea);
  };

  useEffect(() => {
    // Invoke the filterTasks function when category or area changes
    filterTasks(category, area);
  }, [category, area]);

  // Function to reset filters
  const handleReset = () => {
    setCategory(""); // Reset category
    setArea(""); // Reset area
    fetchTasks(); // Reset tasks by invoking the fetchTasks action
  };

  // Return the FilterTaskFeed component.
  return (
    <StyledFilterTaskFeed>
      <BodyText
        className={"bodytext-filtertaskfeed"}
        text={
          "A Helping Hand is all about the community coming together and helping each other out. Take the opportunity to make someones day by offering a helping hand!"
        }
      />

      <BodyText
        className={"bodytext-filtertaskfeed"}
        text={
          "Below you see everything you can help out with in Varberg at the moment. Make sure to filter the tasks by category and area to find the ones that suit you best."
        }
      />

      <BodyText
        className={"bodytext-filtertaskfeed"}
        text={
          "When volunteering, your email will be sent to the person that asked for help so they can choose to contact you. You can find the deeds you have volunteered for on your profile page."
        }
      />

      <StyledFilters>
        {/* Filter tasks by category */}
        <StyledSelects
          className="category-select"
          type="select"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option disabled default value="">
            Filter by category
          </option>
          <option value="Pets">Pets</option>
          <option value="Garden">Garden</option>
          <option value="Shopping">Shopping</option>
          <option value="Repairs">Repairs</option>
          <option value="Other">Other</option>
        </StyledSelects>

        {/* Filter tasks by area */}
        <StyledSelects
          className="area-select"
          type="select"
          onChange={(e) => setArea(e.target.value)}
          value={area}
        >
          <option disabled default value="">
            Filter by area
          </option>
          <option value="Bua">Bua</option>
          <option value="Getterön">Getterön</option>
          <option value="Himle">Himle</option>
          <option value="Hunnestad">Hunnestad</option>
          <option value="Källstorp">Källstorp</option>
          <option value="Kungsäter">Kungsäter</option>
          <option value="Rolfstorp">Rolfstorp</option>
          <option value="Skällinge">Skällinge</option>
          <option value="Tofta">Tofta</option>
          <option value="Torpa">Torpa</option>
          <option value="Trönningenäs">Trönningenäs</option>
          <option value="Tvååker">Tvååker</option>
          <option value="Tångaberg">Tångaberg</option>
          <option value="Valinge">Valinge</option>
          <option value="Varberg City">Varberg City</option>
          <option value="Veddige">Veddige</option>
          <option value="Väröbacka">Väröbacka</option>
          <option value="Årnäs">Årnäs</option>
          <option value="Åsby (Derome)">Åsby (Derome)</option>
        </StyledSelects>
      </StyledFilters>
      <Button
        onClick={handleReset} // Invoke the handleReset function when the button is clicked
        className="filterReset-button"
        buttonName="Reset and Show All Tasks"
      />
    </StyledFilterTaskFeed>
  );
};
