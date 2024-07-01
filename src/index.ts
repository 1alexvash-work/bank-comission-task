import { assertEqual, runTests } from "./tests";
import inputData from "./input.json";
import calculateCommissionFees from "./calculateCommissionFees";
import { OperationWithResult } from "./types";

const runAsyncTests = async () => {
  await Promise.all(
    inputData.map(async (operation) => {
      console.log(
        assertEqual({
          actual: await calculateCommissionFees(
            operation as OperationWithResult
          ),
          expected: operation.expected,
        })
      );
    })
  );
};

runAsyncTests();

// TODO: for tomorrow
// check whether determine operation works | looks alright ✅
// check whether the hardest case, has this fucked up logic with by weekly payment, if so implement some caching, with remembering payment week
// try to do some work, to better decipher on which test is which, so I can do better appropriate testing tomorrow
// Look up my knowledge, on hos the promise all works, is it consequential? it might matter in this task
