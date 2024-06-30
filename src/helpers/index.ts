import { Operation } from "../types";

const determineOperation = (operation: Operation) => {
  if (operation.type === "cash_in") {
    return "cash_in";
  } else if (operation.type === "cash_out") {
    if (operation.user_type === "natural") {
      return "cash_out_natural";
    } else if (operation.user_type === "juridical") {
      return "cash_out_juridical";
    }
  }

  return "cash_in";
};

export { determineOperation };
