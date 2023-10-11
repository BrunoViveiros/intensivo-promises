export default async <T>(promises: Array<Promise<T>>): Promise<T> => {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};
