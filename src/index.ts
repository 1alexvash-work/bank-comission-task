import { assertEqual, runTests } from "./tests";
import inputData from "./input.json";
import calculateCommissionFees from "./calculateCommissionFees";
import { OperationWithResult } from "./types";
import { determineOperation } from "./helpers";

const runAsyncTests = async () => {
  console.time("⌛ time to get results");

  for (const operation of inputData) {
    if (
      determineOperation(operation as OperationWithResult) ===
      "cash_out_natural"
    ) {
      console.log(
        assertEqual({
          actual: await calculateCommissionFees(
            operation as OperationWithResult
          ),
          expected: operation.expected,
        })
      );
    }
  }

  console.timeEnd("⌛ time to get results");
};

runAsyncTests();
