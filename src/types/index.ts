type OperationType = "cash_in" | "cash_out";

export type Operation = {
  date: string;
  user_id: number;
  user_type: string;
  type: OperationType;
  operation: {
    amount: number;
    currency: string;
  };
};

// * Example object, for reference only
// {
//   "date": "2016-01-05", // operation date in format `Y-m-d`
//   "user_id": 1, // user id, integer
//   "user_type": "natural", // user type, one of “natural”(natural person) or “juridical”(legal person)
//   "type": "cash_in", // operation type, one of “cash_in” or “cash_out”
//   "operation": {
//       "amount": 200, // operation amount(for example `2.12` or `3`)
//       "currency": "EUR" // operation currency `EUR`
//   }
// }

export type CashInOperation = {
  percents: number;
  max: {
    amount: number;
    currency: string;
  };
};

export type CashOutNaturalOperation = {
  percents: number;
  week_limit: {
    amount: number;
    currency: string;
  };
};

export type CashOutJuridicalOperation = {
  percents: number;
  min: {
    amount: number;
    currency: string;
  };
};
