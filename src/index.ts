import { runTests } from "./tests";
import inputData from "./input.json";
import calculateCommissionFees from "./calculateCommissionFees";
import { OperationWithResult } from "./types";

const getResults = async () => {
  console.time("⌛ time to get results");

  const results = await Promise.all(
    inputData.map(async (operation) => {
      return await calculateCommissionFees(operation as OperationWithResult);
    })
  );

  console.timeEnd("⌛ time to get results");

  return results;
};

const runAsyncTests = async () => {
  const results = await getResults();

  const runTestResults = runTests({
    tests: inputData.map((operation, index) => ({
      actual: results[index],
      expected: (operation as OperationWithResult).expected,
    })),
  });

  console.log({ runTestResults });

  // ! TODO: try logging the promised data, and whether it returns in my selected order
};

runAsyncTests();

// TODO: for tomorrow
// check whether determine operation works | looks alright ✅
// check whether the hardest case, has this fucked up logic with by weekly payment, if so implement some caching, with remembering payment week
// try to do some work, to better decipher on which test is which, so I can do better appropriate testing tomorrow
// Look up my knowledge, on hos the promise all works, is it consequential? it might matter in this task
