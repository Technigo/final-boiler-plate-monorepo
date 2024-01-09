import { useEffect, useState } from "react";
import { taskStore } from "../stores/taskStore";
import { Button } from "./Buttons/Button";
import aHelpingHandLogotype from "/a-helping-hand-logotype.png";
import styled from "styled-components";

const StyledFilterTaskFeed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 30px;
  /* margin-bottom: 30px; */
  height: 500px;

  @media screen and (min-width: 600px) {
    height: 400px;
  }

  @media screen and (min-width: 1000px) {
    width: 700px;
  }
`;

const StyledLogotype = styled.img`
  width: 75px;
`;

const StyledFilters = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    gap: 50px;
    margin-top: 0;
  }
`;

const StyledSelects = styled.select`
  display: flex;
  width: 120px;
  border: 1px solid var(--secondaryColor);
  border-radius: 20px;
  padding: 5px;

  &.category-select,
  &.area-select {
    width: 140px;
  }
`;

export const FilterTaskFeed = () => {
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const { fetchTasks } = taskStore();

  // Function to filter tasks by category and area
  const filterTasks = (selectedCategory, selectedArea) => {
    const tasks = taskStore
      .getState()
      .filterTasksByCategoryAndArea(selectedCategory, selectedArea);
    setFilteredTasks(tasks);
  };

  useEffect(() => {
    filterTasks(category, area);
  }, [category, area]);

  // Function to reset filters
  const handleReset = () => {
    setCategory("");
    setArea("");
    fetchTasks(); // Reset tasks by invoking the fetchTasks action
  };

  return (
    <StyledFilterTaskFeed>
      <p>
        A Helping Hand is all about connecting people. Take the opportunity to
        make someone&apos;s day by offering a helping hand!
      </p>
      <StyledLogotype
        src={aHelpingHandLogotype}
        className="logotype"
        alt="A Helping Hand Logotype"
      />
      <p>
        You can find the deeds you have offered to volunteer to on your profile
        page.
      </p>

      <StyledFilters>
        {/* Filter tasks by category */}
        <StyledSelects
          className="category-select"
          type="select"
          // onChange={handleCategoryChange}
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option disabled default value="">
            Filter by category
          </option>
          <option value="Garden">Garden</option>
          <option value="Pets">Pets</option>
          <option value="Shopping">Shopping</option>
          <option value="Repairs">Repairs</option>
          <option value="Other">Other</option>
        </StyledSelects>

        {/* Filter tasks by area */}
        <StyledSelects
          className="area-select"
          type="select"
          // onChange={handleAreaChange}
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
          <option value="Varberg city">Varberg city</option>
          <option value="Veddige">Veddige</option>
          <option value="Väröbacka">Väröbacka</option>
          <option value="Årnäs">Årnäs</option>
          <option value="Åsby (Derome)">Åsby (Derome)</option>
        </StyledSelects>
      </StyledFilters>
      <Button
        onClick={handleReset}
        className="filterReset-button"
        buttonName="Reset and Show All Tasks"
      />
    </StyledFilterTaskFeed>
  );
};
