// import { useState } from "react";
// import { months } from "../../../../utils/days";
// import { IoIosArrowForward } from "react-icons/io";
// import { IoIosArrowBack } from "react-icons/io";

// export const CalenderHeader = ({ selectedMonth, year, monthHandler, onMonth }) => {
//   const [monthIndex, setMonthIndex] = useState(selectedMonth);

//   const decreaseMonth = () => {
//     const decreasedMonth = Math.abs((monthIndex + 12 - 1) % 12);
//     setMonthIndex(decreasedMonth);
//     onMonth(decreaseMonth);
//   };

//   const increaseMonth = () => {
//     const increasedMonth = Math.abs((monthIndex + 1) % 12);
//     setMonthIndex(increasedMonth);
//     onMonth(increaseMonth);
//   };

//   return (
//     <div className="header">
//       <div className="header--info">
//         <span className="header--month" onClick={monthHandler}>
//           {months[monthIndex]}
//         </span>
//         <span className="header--year">{year}</span>
//       </div>
//       <div className="header-icons">
//         <span onClick={decreaseMonth}>
//           <IoIosArrowForward />
//         </span>
//         <span onClick={increaseMonth}>
//           <IoIosArrowBack />
//         </span>
//       </div>
//     </div>
//   );
// };
