export default async <T>(promises: Array<Promise<T>>) => {
  const lengthWithoutEmpty = (arr: unknown[]) => {
    return arr.filter((i) => i !== undefined).length;
  };

  type Fulfilled = { status: "fulfilled"; value: T };
  type Rejected = { status: "rejected"; reason: unknown };
  type Data = [Fulfilled | Rejected];

  return new Promise((resolve) => {
    const allValues = [] as unknown as Data;

    promises.forEach((promise, index) => {
      promise
        .then((response) => {
          allValues[index] = { status: "fulfilled", value: response };

          if (lengthWithoutEmpty(allValues) === promises.length) {
            resolve(allValues);
          }
        })
        .catch((e) => {
          allValues[index] = { status: "rejected", reason: e };
          if (lengthWithoutEmpty(allValues) === promises.length) {
            resolve(allValues);
          }
        });
    });
  });
};
