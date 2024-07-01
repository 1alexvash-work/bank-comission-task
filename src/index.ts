import { runTests } from "./tests";
import inputData from "./input.json";
import calculateCommissionFees from "./calculateCommissionFees";
import { Operation } from "./types";

const expectedList = [
  0.06, // first test case result
  0.9, // second test case result
  87.0, // third test case result
  3.0, // fourth test case result
  0.3, // fifth test case result
  0.3, // sixth test case result
  5.0, // seventh test case result
  0.0, // eighth test case result
  0.0, // ninth test case result
];

const getResults = async () => {
  console.time("⌛ time to get results");

  const results = await Promise.all(
    inputData.map(async (operation) => {
      return await calculateCommissionFees(operation as Operation);
    })
  );

  console.timeEnd("⌛ time to get results");

  return results;
};

const runAsyncTests = async () => {
  const results = await getResults();
  console.log("results:", results);

  const runTestResults = runTests({
    tests: results.map((result, index) => ({
      actual: result,
      expected: expectedList[index],
    })),
  });

  console.log({ runTestResults });

  console.timeEnd("⌛ Test time");
};

runAsyncTests();
