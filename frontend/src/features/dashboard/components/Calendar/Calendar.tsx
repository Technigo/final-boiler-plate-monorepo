// import { ContentFrame } from "../../../../ui/ContentFrame";
// import { useState } from "react";

// import { daysInMonth } from "../../../../utils/days";
// import { CalenderHeader } from "./CalenderHeader";
// import { WeekDays } from "./Weekdays";
// import { DaysOfMonth } from "./DaysOfMonth";
// import { MonthSelector } from "./MonthSelector";

// const now = new Date();

// export const Calendar = () => {
//   const [daysInfo, setDaysInfo] = useState({
//     month: now.getMonth(),
//     now: now,
//     displayMonthSelector: false,
//   });

//   console.log(daysInfo, now.getMonth());

//   // const [month, setMonth] = useState({
//   //   month: daysInfo.month,
//   //   now: daysInfo.now,
//   // });

//   const handleSetMonth = (newMonth) => {
//     setDaysInfo((prevState) => {
//       const newNow = new Date(prevState.now);
//       console.log(prevState.now);
//       return {
//         ...prevState,
//         month: newMonth,
//         now: newNow,
//       };
//     });
//   };

//   const handleMonth = () => {
//     setDaysInfo((prevState) => ({ ...prevState, displayMonthSelector: true }));
//   };

//   const selectMonth = (month) => {
//     console.log(month);
//     setDaysInfo((prevState) => ({ ...prevState, displayMonthSelector: false, month: month }));
//   };

//   const days = daysInMonth(daysInfo.month);

//   return (
//     <ContentFrame>
//       <div className="calendar">
//         <CalenderHeader
//           selectedMonth={daysInfo.month}
//           year={now.getFullYear()}
//           onMonth={handleSetMonth}
//           monthHandler={handleMonth}
//         />
//         <WeekDays />
//         <DaysOfMonth monthDays={days} month={daysInfo.month} now={now} />
//         {daysInfo.displayMonthSelector && (
//           <MonthSelector selectedMonth={daysInfo.month} selectMonthHandler={selectMonth} />
//         )}
//       </div>
//     </ContentFrame>
//   );
// };
