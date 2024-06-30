import { runTests } from "./tests";
import inputData from "./input.json";
import calculateCommissionFees from "./calculateCommissionFees";
import { Operation } from "./types";

const expectedList = [0.06, 0.9, 87.0, 3.0, 0.3, 0.3, 5.0, 0.0, 0.0];

const runAsyncTests = async () => {
  console.time("⌛ Test time");

  const tests = await Promise.all(
    inputData.map(async (operation, index) => ({
      actual: await calculateCommissionFees(operation as Operation),
      expected: expectedList[index],
    }))
  );

  const runTestResults = runTests({ tests });

  console.log({ runTestResults });

  console.timeEnd("⌛ Test time");
};

runAsyncTests();
