// import { firstDayOfMonth } from "../../../../utils/days";

// export const DaysOfMonth = ({ monthDays, now, month }) => {
//   const days = Array.from({ length: monthDays }, (k, v) => v + 1);
//   const dayToBeginTheMonthFrom = firstDayOfMonth(month);
//   const currentDate = now.getDate();
//   const style = { gridColumnStart: dayToBeginTheMonthFrom + 1 };

//   return days.map((day, i) => {
//     return (
//       <span
//         key={i}
//         className={`font-semi-bold ${i === 0 ? "text-green-500" : ""}
//               ${day === currentDate ? "text-blue-500" : ""}
//               ${
//                 (i + dayToBeginTheMonthFrom) % 7 === 0 || (i + dayToBeginTheMonthFrom) % 7 === 6
//                   ? "text-red-500"
//                   : ""
//               }
//               `}
//         style={i === 0 ? style : {}}
//       >
//         {day}
//       </span>
//     );
//   });
// };
