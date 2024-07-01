import { Operation } from "../types";

export const determineOperation = (operation: Operation) => {
  if (operation.type === "cash_out" && operation.user_type === "natural") {
    return "cash_out_natural";
  } else if (
    operation.type === "cash_out" &&
    operation.user_type === "juridical"
  ) {
    return "cash_out_juridical";
  } else {
    return "cash_in";
  }
};

export const ISODateToCalendarWeek = (date: string) => {
  const dateObject = new Date(date);
  const oneJan = new Date(dateObject.getFullYear(), 0, 1);
  const numberOfDays = Math.floor(
    (dateObject.getTime() - oneJan.getTime()) / 86400000
  );

  return Math.ceil((dateObject.getDay() + 1 + numberOfDays) / 7);
};
