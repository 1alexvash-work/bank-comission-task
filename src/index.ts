import { runTests } from "./tests";
import inputData from "./input.json";
import calculateCommissionFees from "./calculateCommissionFees";

const expectedList = [0.06, 0.9, 87.0, 3.0, 0.3, 0.3, 5.0, 0.0, 0.0];

const tests = inputData.map((input, index) => ({
  actual: calculateCommissionFees(input),
  expected: expectedList[index],
}));

const runTestResults = runTests({ tests });

console.log({ runTestResults });
