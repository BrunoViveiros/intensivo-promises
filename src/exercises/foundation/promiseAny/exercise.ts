export default async <T>(promises: Array<Promise<T>>): Promise<T> => {
  const lengthWithoutEmpty = (arr: unknown[]) => {
    return arr.filter((i) => i !== undefined).length;
  };

  const allErrors: string[] = [];

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          allErrors[index] = error;
          if (lengthWithoutEmpty(allErrors) === promises.length) {
            reject(allErrors);
          }
        });
    });
  });
};
