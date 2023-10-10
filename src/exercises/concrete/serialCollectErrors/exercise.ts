type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    type Data = {
      successes: string[];
      errors: string[];
    };

    const withFor = async () => {
      const data: Data = {
        successes: [],
        errors: [],
      };

      for (const item of list) {
        try {
          const response = await postData(item);
          data.successes.push(response);
        } catch (error) {
          data.errors.push(String(error));
        }
      }

      return data;
    };

    const withReduce = async () => {
      return list.reduce(async (acc, item) => {
        const response = await acc;

        try {
          const data = await postData(item);
          return {
            ...response,
            successes: [...response.successes, data],
          };
        } catch (error) {
          return { ...response, errors: [...response.errors, String(error)] };
        }
      }, Promise.resolve({ successes: [], errors: [] } as Data));
    };

    return withReduce();
  };
