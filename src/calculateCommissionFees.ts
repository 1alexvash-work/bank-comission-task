import API from "./API";
import { ISODateToCalendarWeek, determineOperation } from "./helpers";
import {
  CashInOperation,
  CashOutNaturalOperation,
  CashOutJuridicalOperation,
  OperationWithResult,
} from "./types";

const withdrawalLimitHashTable = new Map<string, number>(); // * It does not really look like in the real webapp, this kind of logic, should be on the frontend

const calculateCommissionFees = async (operation: OperationWithResult) => {
  const operationType = determineOperation(operation);

  try {
    if (operationType === "cash_in") {
      const response = await fetch(API.cashIn, { method: "GET" });
      const data = (await response.json()) as CashInOperation;

      const comission = operation.operation.amount * (data.percents / 100);

      return Math.min(comission, data.max.amount);
    } else if (operationType === "cash_out_natural") {
      const response = await fetch(API.cashOutNatural, { method: "GET" });
      const data = (await response.json()) as CashOutNaturalOperation;

      const hashTableKey = `userId-${operation.user_id}-year-${new Date(
        operation.date
      ).getFullYear()}-week-${ISODateToCalendarWeek(operation.date)}`;

      const haskTableKeyDoesNotExist =
        withdrawalLimitHashTable.has(hashTableKey) === false;
      if (haskTableKeyDoesNotExist) {
        withdrawalLimitHashTable.set(hashTableKey, data.week_limit.amount);
      }

      let comissionbleAmount = operation.operation.amount;

      let availableWithdrawalLimit = withdrawalLimitHashTable.get(
        hashTableKey
      ) as number;

      if (availableWithdrawalLimit >= 0) {
        if (availableWithdrawalLimit < operation.operation.amount) {
          comissionbleAmount =
            operation.operation.amount - availableWithdrawalLimit;
          withdrawalLimitHashTable.set(hashTableKey, 0);
        } else {
          withdrawalLimitHashTable.set(
            hashTableKey,
            availableWithdrawalLimit - operation.operation.amount
          );
          comissionbleAmount = 0;
        }
      }

      const comission = comissionbleAmount * (data.percents / 100);

      return comission;
    } else if (operationType === "cash_out_juridical") {
      const response = await fetch(API.cashOutJuridical, { method: "GET" });
      const data = (await response.json()) as CashOutJuridicalOperation;

      const comission = operation.operation.amount * (data.percents / 100);

      return Math.max(comission, data.min.amount);
    }
  } catch (error) {
    console.error("Error:", error);
  }

  return 0;
};

export default calculateCommissionFees;
