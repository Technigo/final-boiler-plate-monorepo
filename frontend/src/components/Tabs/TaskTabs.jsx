import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CreateTask } from "../CreateTask";
import { FilterTaskFeed } from "../FilterTaskFeed";
import { taskStore } from "../../stores/taskStore";
import "./TabsStyling.css";

// Define the TaskTabs component as a functional component.
export const TaskTabs = () => {
  const { fetchTasks } = taskStore();

  const handleReset = () => {
    fetchTasks(); // Fetch tasks from server
  };

  // Define the tabs and their content
  return (
    <Tabs>
      <TabList>
        <Tab tabIndex="0" onClick={handleReset}>
          {/* tabIndex="0" makes tab focusable and when switching tabs the task/need list is reloaded */}
          Ask for help
        </Tab>
        <Tab>Lend a hand</Tab>
      </TabList>
      <TabPanel>
        <CreateTask />
      </TabPanel>
      <TabPanel>
        <FilterTaskFeed />
      </TabPanel>
    </Tabs>
  );
};
