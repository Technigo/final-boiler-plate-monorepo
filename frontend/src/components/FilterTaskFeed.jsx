import { useEffect, useState } from "react";
import { taskStore } from "../stores/taskStore";
import styled from "styled-components";

const StyledFilterTaskFeed = styled.div`
  p {
    margin-top: 10px;
  }
`;

const StyledSelects = styled.select`
  display: flex;
  width: 120px;
  border: 1px solid #64899b;
  border-radius: 20px;
  gap: 10px;
  padding: 5px;

  &.category-select,
  &.area-select {
    width: 140px;
  }
`;

const StyledFilters = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

export const FilterTaskFeed = () => {
  const [category, setCategory] = useState("");
  const [area, setArea] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

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

  return (
    <StyledFilterTaskFeed>
      <p>Or do you want to make a good deed and offer a helping hand?</p>

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
          onChange={(e) => setArea(e.target.value)}
          value={area}
        >
          <option disabled default value="">
            Filter by area
          </option>
          <option value="Varberg City">Varberg City</option>
          <option value="Himle">Himle</option>
          <option value="Kungsäter">Kungsäter</option>
          <option value="Rolfstorp">Rolfstorp</option>
          <option value="Tvååker">Tvååker</option>
          <option value="Veddige">Veddige</option>
        </StyledSelects>
      </StyledFilters>
    </StyledFilterTaskFeed>
  );
};
