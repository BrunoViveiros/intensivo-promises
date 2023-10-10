type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    const withFor = async () => {
      const allData = [];

      for (const item of list) {
        const data = await postData(item);
        allData.push(data);
      }

      return allData;
    };

    const withReduce = async () => {
      return list.reduce(async (acc, item) => {
        const lastPromise = await acc;
        const data = await postData(item);
        return [...lastPromise, data];
      }, Promise.resolve([] as string[]));
    };

    return await withReduce();
  };
