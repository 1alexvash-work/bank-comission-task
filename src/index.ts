import { assertEqual, runTests } from "./tests";
import inputData from "./input.json";
import calculateCommissionFees from "./calculateCommissionFees";
import { OperationWithResult } from "./types";

const runAsyncTests = async () => {
  console.time("⌛ time to get results");

  for (const operation of inputData) {
    console.log(
      assertEqual({
        actual: await calculateCommissionFees(operation as OperationWithResult),
        expected: operation.expected,
      })
    );
  }

  console.timeEnd("⌛ time to get results");
};

runAsyncTests();
