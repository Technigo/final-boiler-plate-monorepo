import { CategoryType } from "../types/flashcardTypes";

export const getDate = () => {
  const now = new Date();
  const today = now.toLocaleDateString("en", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
  const dateArr = today.split(",");
  const [weekday, dates] = [...dateArr];

  return [weekday, dates];
};

export const showTime = () => {
  const time = new Date();
  let hour: string | number = time.getHours();
  let min: string | number = time.getMinutes();
  let ampm: string = "AM";

  if (hour >= 12) {
    ampm = "PM";
    hour > 12 ? (hour -= 12) : "";
  } else if (hour === 0) {
    hour = 12;
    ampm = "AM";
  }

  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;

  return hour + ":" + min + ampm;
};

const colors = [
  "bg-red-light",
  "bg-blue-light",
  "bg-green-default",
  "bg-yellow-light",
  "bg-red-default",
  "bg-sky-default",
];

export const chooseColors = (category: Array<CategoryType>) => {
  return category.map((item, i) => ({
    category: item,
    color: colors.length > i ? colors[i] : colors[i - category.length - 1],
  }));
};
