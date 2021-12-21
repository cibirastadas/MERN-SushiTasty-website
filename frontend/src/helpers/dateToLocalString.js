export const dateToLocaleString = (date) => {
  return new Date(date).toLocaleString("lt", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
