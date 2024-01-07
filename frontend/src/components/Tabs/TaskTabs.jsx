import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CreateTask } from "../CreateTask";
import { FilterTaskFeed } from "../FilterTaskFeed";
import { taskStore } from "../../stores/taskStore";
// import "./HandleTaskTabsStyling.css";
import "./TabsStyling.css";

export const TaskTabs = () => {
  const { fetchTasks } = taskStore();

  const handleReset = () => {
    fetchTasks(); // Reset tasks by invoking the resetTasks action
  };

  return (
    <Tabs>
      <TabList>
        <Tab onClick={handleReset}>Ask for help</Tab>
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
