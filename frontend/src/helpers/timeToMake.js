import { weekDays } from "../data/weekDays";

export const timeToMake = (date) => {
  if (!date.getHours()) {
    return;
  }
  const hours = date.getHours();
  const day = date.getDay();
  const minutes =
    date.getMinutes() === 0 ? date.getMinutes() + "0" : date.getMinutes();
  return `${weekDays[day]} ${hours}:${minutes}`;
};
