export default async <T>(reason: T): Promise<T> => {
  return new Promise((_, reject) => reject(reason));
};
