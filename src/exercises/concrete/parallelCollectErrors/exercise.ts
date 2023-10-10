type Context = {
  postData: (data: string) => Promise<string>;
};

export default ({ postData }: Context) =>
  async (list: Array<string>) => {
    type Data = {
      successes: string[];
      errors: string[];
    };

    const data: Data = {
      successes: [],
      errors: [],
    };

    const mapResponseWithReduce = (values: PromiseSettledResult<string>[]) => {
      return values.reduce((acc, response) => {
        if (response.status === "fulfilled")
          return { ...acc, successes: [...acc.successes, response.value] };
        if (response.status === "rejected")
          return { ...acc, errors: [...acc.errors, response.reason] };
        return acc;
      }, data);
    };

    const allPromises = list.map((item) => postData(item));

    return Promise.allSettled(allPromises).then(mapResponseWithReduce);
  };
