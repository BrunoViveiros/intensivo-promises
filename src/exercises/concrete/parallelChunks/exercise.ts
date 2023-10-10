import { chunk } from "lodash";

type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const createParallelChunk = (list: Array<string>) => {
      const allPromises = list.map((item) => postData(item));

      return Promise.all(allPromises);
    };

    const createParallelChunckList = async (list: Array<string>) => {
      const newList = [...list];
      const allPromises = [];

      while (newList.length > 0) {
        const currentChunk = newList.splice(0, 5);
        const currentChunkResults = await createParallelChunk(currentChunk);

        allPromises.push(currentChunkResults);
      }

      return allPromises.flatMap((i) => i);
    };

    return await createParallelChunckList(list);
  };

// - Signature: `(list: Array<string>) => Promise<Array<string>>`
// - Calls `postData` with each element in `list` in parallel, in chunks of 5
// - Returns the list of results of `postData`
