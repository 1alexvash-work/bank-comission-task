import API from "./API";
import { determineOperation } from "./helpers";
import {
  CashInOperation,
  CashOutNaturalOperation,
  CashOutJuridicalOperation,
  Operation,
} from "./types";

const calculateCommissionFees = async (operation: Operation) => {
  const operationType = determineOperation(operation);

  try {
    if (operationType === "cash_in") {
      const response = await fetch(API.cashIn, { method: "GET" });
      const data = (await response.json()) as CashInOperation;

      const comission = operation.operation.amount * (data.percents / 100);

      return Math.min(comission, data.max.amount);
    } else if (operationType === "cash_out_natural") {
      return -1;
    } else if (operationType === "cash_out_juridical") {
      return -1;
    }
  } catch (error) {
    console.error("Error:", error);
  }

  return 0;
};

export default calculateCommissionFees;
