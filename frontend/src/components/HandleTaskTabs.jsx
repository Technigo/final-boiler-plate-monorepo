import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CreateTask } from "../components/CreateTask";
import { FilterTaskFeed } from "../components/FilterTaskFeed";
//import styled from "styled-components";
import "../components/HandleTaskTabsStyling.css";

// const StyledTabs = styled(Tabs)`
//   .react-tabs {
//     -webkit-tap-highlight-color: transparent;
//   }
// `;

// Apply styles to the components within TabsWrapper
// const StyledTabList = styled(TabList)`
//   .react-tabs__tab-list {
//     border-bottom: 1px solid #aaa;
//     margin: 0 0 10px;
//     padding: 0;
//   }
// `;

// const StyledTab = styled(Tab)`
//   .react-tabs__tab {
//     display: inline-block;
//     border: 1px solid transparent;
//     border-bottom: none;
//     bottom: -1px;
//     position: relative;
//     list-style: none;
//     padding: 6px 12px;
//     cursor: pointer;
//   }

//   .react-tabs__tab--selected {
//     background: #fff;
//     border-color: #aaa;
//     color: black;
//     border-radius: 5px 5px 0 0;
//   }

//   .react-tabs__tab--disabled {
//     color: GrayText;
//     cursor: default;
//   }

//   .react-tabs__tab:focus {
//     outline: none;
//   }

//   .react-tabs__tab:focus:after {
//     content: "";
//     position: absolute;
//     height: 5px;
//     left: -4px;
//     right: -4px;
//     bottom: -5px;
//     background: #fff;
//   }
// `;

// const StyledTabPanel = styled(TabPanel)`
//   .react-tabs__tab-panel {
//     display: none;
//   }

//   .react-tabs__tab-panel--selected {
//     display: block;
//   }
// `;

// const TabsWrapper = styled.div`
//   .react-tabs {
//     -webkit-tap-highlight-color: transparent;
//   }

//   .react-tabs__tab-list {
//     border-bottom: 1px solid #aaa;
//     margin: 0 0 10px;
//     padding: 0;
//   }

//   .react-tabs__tab {
//     display: inline-block;
//     border: 1px solid transparent;
//     border-bottom: none;
//     bottom: -1px;
//     position: relative;
//     list-style: none;
//     padding: 6px 12px;
//     cursor: pointer;
//   }

//   .react-tabs__tab--selected {
//     background: #fff;
//     border-color: #aaa;
//     color: black;
//     border-radius: 5px 5px 0 0;
//   }

//   .react-tabs__tab--disabled {
//     color: GrayText;
//     cursor: default;
//   }

//   .react-tabs__tab:focus {
//     outline: none;
//   }

//   .react-tabs__tab:focus:after {
//     content: "";
//     position: absolute;
//     height: 5px;
//     left: -4px;
//     right: -4px;
//     bottom: -5px;
//     background: #fff;
//   }

//   .react-tabs__tab-panel {
//     display: none;
//   }

//   .react-tabs__tab-panel--selected {
//     display: block;
//   }
// `;

export const HandleTaskTabs = () => (
  //<TabsWrapper>
  <Tabs>
    <TabList>
      <Tab>Ask for help</Tab>
      <Tab>Lend a hand</Tab>
    </TabList>
    <TabPanel>
      <CreateTask />
    </TabPanel>
    <TabPanel>
      <FilterTaskFeed />
    </TabPanel>
  </Tabs>
  //</TabsWrapper>
);
