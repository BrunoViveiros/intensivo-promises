export default async <T>(promises: Array<Promise<T>>): Promise<Array<T>> => {
  const lengthWithoutEmpty = (arr: unknown[]) => {
    return arr.filter((i) => i !== undefined).length;
  };

  return new Promise((resolve, reject) => {
    const allValues = [] as T[];

    promises.forEach((promise, index) => {
      promise
        .then((response) => {
          allValues[index] = response;

          if (lengthWithoutEmpty(allValues) === promises.length) {
            resolve(allValues);
          }
        })
        .catch((e) => {
          reject(e);
        });
    });
  });
};
