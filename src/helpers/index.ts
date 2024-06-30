import { Operation } from "../types";

const determineOperation = (operation: Operation) => {
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

export { determineOperation };
